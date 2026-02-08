import { NextResponse } from 'next/server';
import { getUserLibraryProduct, requireAuth } from '@/lib/supabase/serverHelper';
import { getSupabaseServer } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  const user = await requireAuth();
  const product = await getUserLibraryProduct(user.id, productId);

  if (!product.download_path) {
    return new NextResponse('Download path not found', { status: 404 });
  }

  const supabase = getSupabaseServer();
  const { data: signedUrlData, error } = await supabase.storage
    .from('vault')
    .createSignedUrl(product.download_path, 60);

  if (error || !signedUrlData?.signedUrl) {
    return new NextResponse('Download error', { status: 500 });
  }

  return NextResponse.redirect(signedUrlData.signedUrl);
}