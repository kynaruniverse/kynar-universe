import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth, getUserLibraryProduct } from '@/lib/supabase/serverHelper';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return new NextResponse('Server misconfigured', { status: 500 });
  }

  const supabaseServer = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Require authentication
  const user = await requireAuth();

  // Fetch product owned by user with proper validation
  const product = await getUserLibraryProduct(user.id, productId);

  // Add null check for download_path
  if (!product.download_path) {
    return new NextResponse('Download path not found', { status: 404 });
  }

  // Generate signed URL (valid 60 seconds)
  const { data, error } = await supabaseServer.storage
    .from('vault')
    .createSignedUrl(product.download_path, 60);

  if (error || !data?.signedUrl) {
    return new NextResponse('Download error', { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
