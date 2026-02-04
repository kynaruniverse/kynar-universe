/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v2.1)
 * Role: Validating ownership and generating transient signed access to the Storage Vault.
 * Fixed: Property mapping (download_path) and unused parameter.
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { UserLibrary, Product } from "@/lib/supabase/types";

export async function GET(
  _request: Request, // Added underscore to fix TS6133 unused parameter
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const supabase = await createClient();
  
  // 1. Authenticate Identity
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized: Identity Required", { status: 401 });
  }

  /**
   * 2. Verify Ownership & Retrieve Metadata
   * Note: 'file_path' updated to 'download_path' to match types.ts
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

  // Cast through the UserLibrary extended type for property safety
  const ownership = data as unknown as UserLibrary & { products: Pick<Product, 'slug' | 'download_path'> };
  const product = ownership?.products;

  if (error || !product?.download_path) {
    return new NextResponse("Forbidden: Asset Ownership Not Verified", { status: 403 });
  }

  /**
   * 3. Generate Transient Access
   * Note: The bucket 'vault' must be private for this security layer to function.
   */
  const { data: signedData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.download_path, 60, {
      download: true, // Forces Content-Disposition: attachment
    });
  if (storageError || !signedData?.signedUrl) {
    console.error("[Vault] Storage Error:", storageError?.message);
    return new NextResponse("Asset Unavailable: Storage Synchronization Failure", { status: 404 });
  }

  // 4. Perform Redirection to Secure Link
  return NextResponse.redirect(signedData.signedUrl, 303);
}
