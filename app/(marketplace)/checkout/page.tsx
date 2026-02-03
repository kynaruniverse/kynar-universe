/**
 * KYNAR UNIVERSE: Secure Checkout Gateway (v2.0)
 * Role: Server-side validation and payment handoff.
 * Fix: Argument mismatch for generateCheckoutUrl (TS2554) and strictly typed product mapping.
 */

import { redirect } from "next/navigation";
import { generateCheckoutUrl } from "@/lib/lemon-squeezy/checkout";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/lib/supabase/types";

interface CheckoutPageProps {
  searchParams: Promise<{ items?: string }>;
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  // 1. Resolve Next.js 15 Async SearchParams
  const params = await searchParams;
  const rawItems = params.items;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Identity Guard
  if (!user) {
    redirect("/auth/login?return_to=/cart");
  }

  // 3. Validation
  if (!rawItems) redirect("/cart");

  let productIds: string[] = [];
  try {
    productIds = JSON.parse(decodeURIComponent(rawItems));
  } catch (e) {
    console.error("Selection Parse Error:", e);
    redirect("/cart?error=invalid_selection");
  }

  // 4. Verification: Fetch only the necessary fields for the payment gateway
  const { data: products, error } = await supabase
    .from("products")
    .select("id, title, price_id, slug, lemon_squeezy_id")
    .in("id", productIds);

  if (error || !products || products.length === 0) {
    console.error("Verification Error:", error);
    redirect("/cart?error=verification_failed");
  }

  /**
   * 5. Secure Handoff
   * Fix: Bundled arguments into the expected configuration object.
   * This resolves TS2554 by providing 1 argument (the config object).
   */
  const checkoutUrl = await generateCheckoutUrl({
    products: products as Product[],
    userId: user.id,
    userEmail: user.email ?? "",
  });

  if (checkoutUrl) {
    redirect(checkoutUrl);
  } else {
    redirect("/cart?error=gateway_timeout");
  }

  return (
    <main className="flex min-h-[85vh] w-full flex-col items-center justify-center px-gutter bg-canvas text-center">
      <div className="max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-kyn-slate-50 bg-white shadow-kynar-soft">
          <div className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kyn-green-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-kyn-green-500"></span>
          </div>
        </div>
        
        <h1 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900">
          Preparing Acquisition
        </h1>
        
        <p className="mt-4 font-ui text-sm leading-relaxed text-kyn-slate-400">
          Initializing secure checkout for your vault selection. Please do not refresh.
        </p>
      </div>
    </main>
  );
}
