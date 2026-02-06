import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Define the shape of the joined query to replace 'any'
interface ProductAccess {
  id: string;
  product_id: string;
  products: {
    slug: string;
    download_path: string;
  } | null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  /**
   * Verified Ownership
   * FIXED: Replaced 'as any' with concrete type casting for strict builds.
   */
  const { data, error } = await supabase
    .from("user_library")
    .select(`
      id,
      product_id,
      products (
        slug,
        download_path
      )
    `)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle() as { data: ProductAccess | null; error: any };

  // Safely access nested join data
  const product = data?.products;

  if (error || !product?.download_path) {
    console.error("[Vault] Access Denied:", error?.message);
    return new NextResponse("Forbidden", { status: 403 });
  }

  /**
   * Generate Signed URL
   */
  const { data: signedData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.download_path, 60, {
      download: true,
    });

  if (storageError || !signedData?.signedUrl) {
    return new NextResponse("Asset Unavailable", { status: 404 });
  }

  return NextResponse.redirect(signedData.signedUrl, 303);
}
