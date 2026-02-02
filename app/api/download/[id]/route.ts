import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  // Fetch ownership and file details
  const { data: ownership, error } = await supabase
    .from("user_library")
    .select(`
      products (
        slug,
        file_path
      )
    `)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  const product = (ownership as any)?.products;

  if (error || !product?.file_path) {
    return new NextResponse("Forbidden or File Missing", { status: 403 });
  }

  // Generate signed URL with 60s expiry
  // We force download mode via transform options if supported, 
  // or rely on signed-url metadata.
  const { data, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.file_path, 60);

  if (storageError || !data?.signedUrl) {
    return new NextResponse("Asset Unavailable", { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl, 303);
}
