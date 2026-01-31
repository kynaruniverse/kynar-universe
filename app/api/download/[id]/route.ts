/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v1.5)
 * Role: Verifies ownership and provides a temporary signed URL.
 * Update: Next.js 15 Async Params & Enhanced Error Handling.
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface DownloadParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: DownloadParams
) {
  // 1. Resolve Params & Auth (Next.js 15 Standard)
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (!user || authError) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Ownership Verification
  // Verifying the link between user and product in the vault.
  const { data: ownership, error: ownershipError } = await supabase
    .from("user_library")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (ownershipError || !ownership) {
    return new NextResponse("Forbidden: Ownership not verified", { status: 403 });
  }

  // 3. Asset Retrieval
  // Generate a signed URL for the asset in the 'vault' bucket.
  const { data, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(`${productId}.zip`, 60); // 60-second window

  if (storageError || !data?.signedUrl) {
    console.error("Vault Storage Error:", storageError);
    return new NextResponse("Asset Unavailable: Please contact support", { status: 404 });
  }

  // 4. Secure Handoff: Redirect to the temporary signed URL
  return NextResponse.redirect(data.signedUrl);
}
