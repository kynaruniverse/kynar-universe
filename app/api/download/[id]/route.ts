import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v1.1)
 * Purpose: Verifies ownership and provides a temporary signed URL.
 * Rule: Files never touch the public internet without a session signature.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const productId = params.id;

  // 1. Identity Verification
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user || authError) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Ownership Verification (Grounded in user_library table)
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
  // Assumes a private bucket named 'vault' where filenames match the Product UUID
  // This maintains 'Transactional Calm' by automating the link generation.
  const { data, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(`${productId}.zip`, 60); // Link expires in 60 seconds

  if (storageError || !data?.signedUrl) {
    console.error("Storage Error:", storageError);
    return new NextResponse("Asset Not Found: Please contact support", { status: 404 });
  }

  // 4. Secure Handoff
  return NextResponse.redirect(data.signedUrl);
}
