import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Database } from "@/lib/supabase/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const supabase = await createClient(); // Now automatically uses Database type
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data: ownership, error } = await supabase
    .from("user_library")
    .select(`
      id,
      product:products (
        slug,
        download_path
      )
    `)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  const product = (ownership as any)?.product;

  if (error || !product?.download_path) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { data: signedData, error: storageError } = await supabase
    .storage
    .from("vault")
    .createSignedUrl(product.download_path, 60, { download: true });

  if (storageError || !signedData?.signedUrl) {
    return new NextResponse("Storage Error", { status: 404 });
  }

  return NextResponse.redirect(signedData.signedUrl, 303);
}
