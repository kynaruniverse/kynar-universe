import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  
  if (!productId) {
    return new NextResponse('Missing Product ID', { status: 400 })
  }
  
  if (!isValidUUID(productId)) {
    return new NextResponse('Invalid Product ID', { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // 1. Verify ownership
  // We cast the select to ensure the compiler knows content_url exists on the joined table
  const { data: purchase, error } = await supabase
    .from('purchases')
    .select(`
      id,
      products!inner (
        content_url
      )
    `)
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  // Safely extract the content URL
  const productData = purchase?.products as unknown as { content_url: string } | null
  const contentUrl = productData?.content_url

  if (error || !contentUrl) {
    return new NextResponse('Access Denied: Artifact ownership not verified.', { status: 403 })
  }

  // 2. Log access using the imported Admin Client (No more getAdminClient undefined error)
  await supabaseAdmin.from('download_logs').insert({
    user_id: user.id,
    product_id: productId,
    ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    user_agent: request.headers.get('user-agent') || 'unknown'
  })

  // 3. Secure Redirect
  return NextResponse.redirect(contentUrl)
}
