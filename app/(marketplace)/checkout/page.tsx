/**
 * KYNAR UNIVERSE: Secure Checkout Gateway (v1.6)
 * Role: Server-side validation and payment handoff.
 * Logic: Next.js 15 Async Params -> DB Verification -> LS URL Generation.
 */

import { redirect } from "next/navigation";
import { generateCheckoutUrl } from "@/lib/lemon-squeezy/checkout";
import { createClient } from "@/lib/supabase/server";

// 1. Explicitly define what a verified product looks like for the gateway logic
interface VerifiedProduct {
  id: string;
  title: string;
  price_id: string;
  slug: string;
}

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

  // 2. Identity Guard: Ensure user is grounded before transaction
  if (!user) {
    redirect("/auth/login?return_to=/cart");
  }

  // 3. Validation: Ensure selection exists
  if (!rawItems) redirect("/cart");

  let productIds: string[] = [];
  try {
    productIds = JSON.parse(decodeURIComponent(rawItems));
  } catch (e) {
    console.error("Selection Parse Error:", e);
    redirect("/cart?error=invalid_selection");
  }

  // 4. Verification: Explicitly type the result to avoid 'never' error
  // Fresh DB state prevents price/slug manipulation
  const { data: verifiedData, error } = await supabase
    .from("products")
    .select("id, title, price_id, slug") 
    .in("id", productIds)
    .eq("is_published", true);

  // Cast verifiedData to our interface so .map() has context
  const verifiedProducts = verifiedData as VerifiedProduct[] | null;

  if (error || !verifiedProducts || verifiedProducts.length === 0) {
    redirect("/cart?error=selection_not_found");
  }

  // 5. Secure Handoff Generation
  let checkoutUrl: string | null = null;
  
  try {
    checkoutUrl = await generateCheckoutUrl({
      products: verifiedProducts.map((p) => ({
        id: p.id,
        title: p.title, 
        price_id: p.price_id,
        slug: p.slug
      })),
      userEmail: user.email!,
      userId: user.id,
      config: {
        currency: 'GBP',
        receiptButtonText: 'Open My Library',
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      },
      metadata: {
        user_id: user.id,
        product_ids: verifiedProducts.map(p => p.id).join(','),
        transaction_context: "kynar_vault_acquisition_v1.6"
      }
    });
  } catch (err) {
    console.error("Gateway Handoff Failed:", err);
    redirect("/cart?error=checkout_init_failed");
  }

  // 6. Final Execution
  if (checkoutUrl) {
    redirect(checkoutUrl);
  }

  /**
   * FALLBACK UI: "The Vault Gate"
   * Displayed during the brief redirect latency.
   */
  return (
    <main className="flex min-h-[85vh] w-full flex-col items-center justify-center px-gutter bg-canvas text-center">
      <div className="max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Pulsing Status Indicator */}
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
        
        {/* Custom Progress Bar - Mobile Optimized */}
        <div className="mt-12 flex justify-center">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-kyn-slate-100">
            <div className="h-full w-full origin-left animate-pulse bg-kyn-green-500" />
          </div>
        </div>
      </div>
    </main>
  );
}
