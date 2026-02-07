import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { requireAuth, getUserLibraryProduct } from '@/lib/supabase/serverHelper';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  // Require authentication
  const user = await requireAuth();

  // Fetch product owned by user with proper validation
  const product = await getUserLibraryProduct(user.id, productId);

  // Generate signed URL (valid 60 seconds)
  const product = await getUserLibraryProduct(user.id, productId);

  // Add this null check
  if (!product.download_path) {
    return new NextResponse('Download path not found', { status: 404 });
  }

  // Generate signed URL (valid 60 seconds)
  const { data: signedUrlData, error: urlError } = await supabaseServer.storage
    .from('vault')
    .createSignedUrl(product.download_path, 60);

  if (urlError || !signedUrlData?.signedUrl) {
    return new NextResponse('Download error', { status: 500 });
  }

  return NextResponse.redirect(signedUrlData.signedUrl);
}