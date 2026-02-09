/**
 * KYNAR UNIVERSE: User Library Download Endpoint
 * Refactor: Type-safe, clear async flow, structured error responses
 */

import { NextResponse } from "next/server";
import {
  requireAuth,
  getUserLibraryProduct,
  getSupabaseServer,
} from "@/lib/supabase/serverHelper";

export const runtime = "nodejs";

interface Params {
  params: Promise < { id: string } > ;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    // --- Resolve product ID ---
    const { id: productId } = await params;
    
    // --- Auth check ---
    const user = await requireAuth();
    
    // --- Fetch product from user library ---
    const product = await getUserLibraryProduct(user.id, productId);
    if (!product?.download_path) {
      return new NextResponse("Download path not found", { status: 404 });
    }
    
    // --- Generate signed URL from Supabase storage ---
    const supabase = getSupabaseServer();
    const { data: signedUrlData, error } = await supabase.storage
      .from("vault")
      .createSignedUrl(product.download_path, 60);
    
    if (error || !signedUrlData?.signedUrl) {
      console.error("Signed URL generation error:", error);
      return new NextResponse("Download error", { status: 500 });
    }
    
    // --- Redirect to signed download URL ---
    return NextResponse.redirect(signedUrlData.signedUrl);
  } catch (err) {
    console.error("Library download error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}