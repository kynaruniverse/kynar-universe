import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// Helper interface to define exactly what we expect from the join
interface PurchaseWithProduct {
  id: string
  products: {
    content_url: string
  }
}

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

  // 1. Verify ownership with an inner join
  const { data, error } = await supabase
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

  // Cast 'data' to our interface via 'unknown' to bypass the 'never' error
  const purchase = data as unknown as PurchaseWithProduct | null
  const contentUrl = purchase?.products?.content_url

  if (error || !contentUrl) {
    return new NextResponse('Access Denied: Artifact ownership not verified.', { status: 403 })
  }

  // 2. Log access using the Admin Client
  // We wrap the whole operation in a try/catch so logging issues don't kill the user's download
  try {
    const logData = {
      user_id: user.id,
      product_id: productId,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown'
    }

    // Explicitly casting the 'from' call to bypass the 'never' table check
    await (supabaseAdmin.from('download_logs') as any).insert([logData])
  } catch (logError) {
    console.error('Logging failed:', logError)
  }

  // 3. Secure Redirect
  // We use a 302 Found redirect to the secure content URL
  return NextResponse.redirect(new URL(contentUrl))
}
