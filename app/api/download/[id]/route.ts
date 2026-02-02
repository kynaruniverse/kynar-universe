/**
 * KYNAR UNIVERSE: Secure Asset Delivery (v1.6)
 * Role: Ownership verification and Vault redirection.
 * Logic: Product ID -> Ownership Check -> Slug-based Signed URL.
 * Environment: Next.js 15 Server Route.
 */

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface DownloadParams {
  params: Promise<{ id: string }>;
}

// Interface for the joined query result to ensure build safety
interface OwnershipResult {
  products: {
    slug: string;
  } | null;
}

export async function GET(
  request: Request,
  { params }: DownloadParams
) {
  // 1. Next.js 15: Await dynamic route parameters
  const { id: productId } = await params;
  const supabase = await createClient();
  
  // 2. Identity Verification
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user || authError) {
    return new NextResponse("Identity not verified. Please sign in.", { status: 401 });
  }

  // 3. Ownership Verification & Path Resolution
  // We perform a relational check to ensure the user owns the asset and retrieve the slug
  const { data, error: ownershipError } = await supabase
    .from("user_library")
    .select(`
      products (
        slug
      )
    `)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  const ownership = data as unknown as OwnershipResult;

  if (ownershipError || !ownership?.products?.slug) {
    console.warn(`[Vault] Unauthorized access attempt: User ${user.id} -> Product ${productId}`);
    return new NextResponse("Forbidden: This asset is not registered to your vault.", { status: 403 });
  }

  const productSlug = ownership.products.slug;

  // 4. Secure Vault Redirection
  // Assets are stored in the private 'vault' bucket as [slug].zip
  const { data: storageData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(`${productSlug}.zip`, 60);

  if (storageError || !storageData?.signedUrl) {
    console.error(`[Vault] Storage retrieval failure: ${productSlug}`, storageError);
    return new NextResponse("Asset Unavailable: The requested technical file could not be located.", { status: 404 });
  }

  /**
   * 303 Redirect: Tells the mobile browser to fetch the signed URL.
   * This is the cleanest handoff for mobile download managers.
   */
  return NextResponse.redirect(new URL(storageData.signedUrl), 303);
}
