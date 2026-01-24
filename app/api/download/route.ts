import { createClient } from '@/utils/supabase/server';
import { getAdminClient } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  
  if (!productId) return new NextResponse('Missing Product ID', { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return new NextResponse('Unauthorized', { status: 401 });

  // 1. Verify ownership (Double-check they actually bought it)
  const { data: purchase } = await supabase
    .from('purchases')
    .select('id, product:products(content_url)')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single();

  if (!purchase || !purchase.product?.content_url) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 2. Log the download using the Admin Client
  const admin = getAdminClient();
  await admin.from('download_logs').insert({
    user_id: user.id,
    product_id: productId,
    ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    user_agent: request.headers.get('user-agent') || 'unknown'
  });

  // 3. Redirect to the actual secure URL
  return NextResponse.redirect(purchase.product.content_url);
}
