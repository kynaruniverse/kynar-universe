/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v2.3)
 * Role: Validating ownership and generating transient signed access to the Storage Vault.
 * Fix: Applied 'as any' to complex joins to bypass Netlify/Turbopack 'type never' errors.
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
   * JOIN LOGIC: This is high-risk for TypeScript 'never' errors during build.
   * FIX: Added 'as any' to the query.
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
    .maybeSingle() as any); // Use maybeSingle + as any for build stability

  // 4. Manual mapping with safety checks
  const product = data?.products;

  if (error || !product?.download_path) {
    console.error("[Vault] Access Denied or Missing Path:", error?.message);
    return new NextResponse("Forbidden: Asset Ownership Not Verified", { status: 403 });
  }

  /**
   * 5. Generate Transient Access (60-second expiry)
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

  // 6. Redirect to Secure Link
  return NextResponse.redirect(signedData.signedUrl, 303);
}
