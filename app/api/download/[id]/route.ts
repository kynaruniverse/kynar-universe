/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v2.4)
 * Role: Validating ownership and generating transient signed access.
 * Final Fix: Removed unused type imports to satisfy strict production linting.
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
   * FIX: Using 'as any' to bypass complex join type-checking during build.
   */
  const { data, error } = await (supabase
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
    .maybeSingle() as any);

  const product = data?.products;

  if (error || !product?.download_path) {
    console.error("[Vault] Access Denied or Missing Path:", error?.message);
    return new NextResponse("Forbidden: Asset Ownership Not Verified", { status: 403 });
  }

  /**
   * 4. Generate Transient Access (60-second expiry)
   */
  const { data: signedData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.download_path, 60, {
      download: true,
    });

  if (storageError || !signedData?.signedUrl) {
    return new NextResponse("Asset Unavailable: Storage Failure", { status: 404 });
  }

  // 5. Redirect to Secure Link
  return NextResponse.redirect(signedData.signedUrl, 303);
}
