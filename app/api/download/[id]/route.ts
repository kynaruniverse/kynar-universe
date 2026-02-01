/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v1.5)
 * Update: Slug-based retrieval for friendlier Storage filenames.
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
  const { id: productId } = await params;
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user || authError) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 1. Ownership Verification + Slug Retrieval
  // We join the products table to get the slug for the storage path
  const { data: ownership, error: ownershipError } = await supabase
    .from("user_library")
    .select(`
      id,
      products ( slug )
    `)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (ownershipError || !ownership || !ownership.products) {
    return new NextResponse("Forbidden: Ownership not verified", { status: 403 });
  }

  // Extract the slug from the joined query result
  const productSlug = (ownership.products as any).slug;

  // 2. Asset Retrieval using Slug
  // Your file in the 'vault' bucket should now be: [slug].zip
  const { data, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(`${productSlug}.zip`, 60);

  if (storageError || !data?.signedUrl) {
    console.error("Vault Storage Error:", storageError);
    return new NextResponse("Asset Unavailable: File not found in vault.", { status: 404 });
  }

  return NextResponse.redirect(new URL(data.signedUrl), 307);
}
