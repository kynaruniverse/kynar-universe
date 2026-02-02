/**
 * KYNAR UNIVERSE: Secure Checkout Gateway (v1.5)
 * Role: Server-side validation and payment handoff.
 * Logic: Validates user session -> Fetches DB-truth for prices -> Generates LS URL.
 */

import { redirect } from "next/navigation";
import { generateCheckoutUrl } from "@/lib/lemon-squeezy/checkout";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/types";

// Explicitly use the canonical Product row type
type Product = Database['public']['Tables']['products']['Row'];

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
  if (!supabase) redirect("/cart?error=system_error");

  const { data: { user } } = await supabase.auth.getUser();

  // 2. Identity Guard: Ensure user is grounded before transaction
  if (!user) {
    redirect("/auth/login?return_to=/cart");
  }

  // 3. Validation: Ensure selection exists
  if (!rawItems) redirect("/cart");

  let productIds: string[] = [];
  try {
    // Selection is passed as a URI-encoded JSON array of IDs
    productIds = JSON.parse(decodeURIComponent(rawItems));
  } catch (e) {
    console.error("Selection Parse Error:", e);
    redirect("/cart?error=invalid_selection");
  }

  // 4. Verification: Fetch fresh DB state to prevent price/slug manipulation
  const { data: verifiedProducts, error } = await supabase
    .from("products")
    .select("id, title, price_id, slug") 
    .in("id", productIds)
    .eq("is_published", true);

  if (error || !verifiedProducts || verifiedProducts.length === 0) {
    redirect("/cart?error=selection_not_found");
  }

  // 5. Secure Handoff Generation
  let checkoutUrl: string | null = null;
  
  try {
    // We map the verified DB data, NOT the client-side data
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
        // Next.js 15 Site URL resolution
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      },
      metadata: {
        user_id: user.id,
        // Critical: Comma-separated IDs for the fulfillment webhook logic
        product_ids: verifiedProducts.map(p => p.id).join(','),
        transaction_context: "kynar_vault_acquisition_v1.5"
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
   * FALLBACK UI: "The Waiting Room"
   * Displayed only during the brief redirect latency.
   * Aligned with Design System: Section 11 (Atmospheric Motion).
   */
  return (
    <main className="flex min-h-[85vh] w-full flex-col items-center justify-center px-gutter bg-canvas">
      <div className="max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface shadow-kynar-soft">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kyn-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-kyn-green-500"></span>
          </div>
        </div>
        
        <h1 className="font-brand text-2xl font-bold tracking-tight text-text-primary">
          Opening the Vault
        </h1>
        
        <p className="mt-4 font-ui text-sm leading-relaxed text-text-secondary">
          Preparing secure permanent access for your digital selection. 
          Redirecting to the Kynar payment gateway...
        </p>
        
        <div className="mt-12 flex justify-center">
          <div className="h-1 w-24 overflow-hidden rounded-full bg-border">
            <div className="h-full w-full origin-left animate-[loading-bar_2s_infinite_ease-in-out] bg-kyn-green-500" />
          </div>
        </div>
      </div>
    </main>
  );
}
