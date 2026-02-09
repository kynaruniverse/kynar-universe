"use server";

import { redirect } from "next/navigation";
import { generateCheckoutUrl } from "@/lib/lemon-squeezy/checkout";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/lib/supabase/types";

interface CheckoutPageProps {
  searchParams: Promise < { items ? : string } > ;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  // --- Step 1: Resolve and parse search params ---
  const params = await searchParams;
  const rawItems = params.items;
  
  if (!rawItems) redirect("/cart");
  
  let productIds: string[] = [];
  try {
    productIds = JSON.parse(decodeURIComponent(rawItems));
  } catch (error) {
    console.error("Selection Parse Error:", error);
    redirect("/cart?error=invalid_selection");
  }
  
  // --- Step 2: Authenticate user ---
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) redirect("/auth/login?return_to=/cart");
  
  // --- Step 3: Fetch products ---
  const { data: products, error } = await (supabase
    .from("products")
    .select("id, title, price_id, slug, lemon_squeezy_id")
    .in("id", productIds) as any);
  
  if (error || !products || products.length === 0) {
    console.error("Product Verification Error:", error);
    redirect("/cart?error=verification_failed");
  }
  
  // --- Step 4: Generate checkout URL ---
  const checkoutUrl = await generateCheckoutUrl({
    products: products as Product[],
    userId: user.id,
    userEmail: user.email ?? "",
  });
  
  if (!checkoutUrl) redirect("/cart?error=gateway_timeout");
  
  // --- Step 5: Redirect to checkout ---
  redirect(checkoutUrl);
  
  // --- Step 6: Loading UI (should be rare, only shows briefly) ---
  return (
    <main className="flex min-h-[85vh] w-full flex-col items-center justify-center px-gutter bg-canvas text-center">
      <div className="max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900 uppercase">
          Preparing Acquisition
        </h1>
        <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.2em] leading-relaxed text-kyn-slate-400">
          Initializing secure checkout for your vault selection.
        </p>
      </div>
    </main>
  );
}