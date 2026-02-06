import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Product } from "@/lib/supabase/types";

interface LibraryJoin {
  product_id: string;
  products: Product | null;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("user_library")
    .select(`product_id, products (*)`)
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle() as unknown as { data: LibraryJoin | null; error: any };

  if (error || !data?.products?.download_path) return new NextResponse("Forbidden", { status: 403 });

  const { data: signedUrl } = await supabase.storage
    .from("vault")
    .createSignedUrl(data.products.download_path, 60);

  return NextResponse.redirect(signedUrl?.signedUrl || '');
}
