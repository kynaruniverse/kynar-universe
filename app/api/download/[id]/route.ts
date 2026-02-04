/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v2.2)
 * Fix: Removed 'unknown' casting and implemented strict property validation.
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Database } from "@/lib/supabase/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const supabase = await createClient<Database>();
  
  // 1. Authenticate Identity
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse("Unauthorized: Identity Required", { status: 401 });
  }

  /**
   * 2. Verify Ownership & Retrieve Metadata
   * We use strict typing via Database to ensure 'products' join is recognized.
   */
  const { data: ownership, error } = await supabase
    .from("user_library")
    .select(`
      id,
      product_id,
      product:products (
        slug,
        download_path
      )
    `)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  /**
   * Strict Validation:
   * We check if the product and download_path exist without using 'any' or 'unknown'.
   * Supabase joins can return objects or arrays; we handle the object case here.
   */
  const product = ownership?.product as unknown as { slug: string; download_path: string | null } | null;

  if (error || !product?.download_path) {
    console.error("[Vault] Ownership Verification Failed:", error?.message);
    return new NextResponse("Forbidden: Asset Ownership Not Verified", { status: 403 });
  }

  /**
   * 3. Generate Transient Access
   * The signed URL is valid for 60 seconds.
   */
  const { data: signedData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.download_path, 60, {
      download: true,
    });

  if (storageError || !signedData?.signedUrl) {
    console.error("[Vault] Storage Error:", storageError?.message);
    return new NextResponse("Asset Unavailable: Storage Synchronization Failure", { status: 404 });
  }

  // 4. Perform Redirection to Secure Link
  return NextResponse.redirect(signedData.signedUrl, 303);
}
