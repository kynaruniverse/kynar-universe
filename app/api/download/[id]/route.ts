/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v2.2)
 * Role: Validating ownership and generating transient signed access to the Storage Vault.
 * Framework: Next.js 16 (Release Year: 2026)
 * Deployment: Netlify Edge / Node Runtime
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { UserLibrary, Product } from "@/lib/supabase/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Resolve Parameters (Async in Next.js 16)
  const { id: productId } = await params;
  const supabase = await createClient();
  
  // 2. Authenticate Identity
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized: Identity Required", { status: 401 });
  }

  /**
   * 3. Verify Ownership & Retrieve Metadata
   * The join ensures we only get the path if the user actually owns the product.
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
    .single();

  // Type-safe mapping using the project's canonical Database schema
  const ownership = data as unknown as UserLibrary & { 
    products: Pick<Product, 'slug' | 'download_path'> 
  };
  const product = ownership?.products;

  if (error || !product?.download_path) {
    return new NextResponse("Forbidden: Asset Ownership Not Verified", { status: 403 });
  }

  /**
   * 4. Generate Transient Access
   * Note: The bucket 'vault' must be private. 
   * The signed URL expires in 60 seconds to prevent link sharing.
   */
  const { data: signedData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.download_path, 60, {
      download: true, // Triggers Content-Disposition: attachment in the browser
    });

  if (storageError || !signedData?.signedUrl) {
    console.error("[Vault] Storage Access Error:", storageError?.message);
    return new NextResponse("Asset Unavailable: Storage Synchronization Failure", { status: 404 });
  }

  // 5. Perform Redirection to Secure Link (Status 303: See Other)
  return NextResponse.redirect(signedData.signedUrl, 303);
}
