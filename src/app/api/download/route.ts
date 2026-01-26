import { createClient } from '@/lib/supabase/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  
  if (!productId) return new NextResponse('Missing Product ID', { status: 400 })
  
  if (!isValidUUID(productId)) {
    return new NextResponse('Invalid Product ID', { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  // 1. Verify ownership (Ensures they actually purchased this specific artifact)
  const { data: purchase } = await supabase
    .from('purchases')
    .select('id, product:products(content_url)')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  if (!purchase || !purchase.product?.content_url) {
    return new NextResponse('Access Denied', { status: 403 })
  }

  // 2. Log the access event using the elevated Admin Client
  const admin = getAdminClient()
  await admin.from('download_logs').insert({
    user_id: user.id,
    product_id: productId,
    ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    user_agent: request.headers.get('user-agent') || 'unknown'
  })

  // 3. Secure Redirect to the delivery endpoint
  return NextResponse.redirect(purchase.product.content_url)
}
