import { redirect } from "next/navigation";
import { generateCheckoutUrl } from "@/lib/lemon-squeezy/checkout";
import { createClient } from "@/lib/supabase/server";

/**
 * KYNAR UNIVERSE: Checkout Gateway (v1.5)
 * Purpose: Secure, grounded bridge to Lemon Squeezy.
 * Fix: Updated for Next.js 15 Async searchParams.
 */

interface CheckoutPageProps {
  searchParams: Promise<{ items?: string }>;
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  // 1. Await SearchParams (Next.js 15 Requirement)
  const params = await searchParams;
  const rawItems = params.items;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Identity Guard (UX Canon 7: Ownership requires a home)
  if (!user) {
    redirect("/auth/login?return_to=/cart");
  }

  if (!rawItems) redirect("/cart");

  let productIds: string[] = [];
  try {
    productIds = JSON.parse(decodeURIComponent(rawItems));
  } catch {
    redirect("/cart");
  }

  // 3. Data Validation & Schema Alignment
  const { data: products, error } = await supabase
    .from("products")
    .select("id, title, price_id, slug") 
    .in("id", productIds);

  if (!products || products.length === 0 || error) {
    redirect("/cart?error=selection_not_found");
  }

  // 4. Secure Handoff Generation
  let checkoutUrl: string | null = null;
  try {
    checkoutUrl = await generateCheckoutUrl({
      products: products.map(p => ({
        id: p.id,
        name: p.title, 
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
        context: "kynar_vault_transaction"
      }
    });
  } catch (err) {
    console.error("Checkout Handoff Error:", err);
    redirect("/checkout/error");
  }

  // 5. The Final Redirect
  if (checkoutUrl) {
    redirect(checkoutUrl);
  }

  // Fallback UI (Design System v1.5 Refresh)
  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 text-center bg-canvas">
      <div className="max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="mx-auto mb-8 h-12 w-12 rounded-full border border-kyn-slate-100 bg-surface flex items-center justify-center">
          <div className="h-2 w-2 animate-ping rounded-full bg-kyn-green-600" />
        </div>
        
        <h1 className="font-brand text-xl font-medium tracking-tight text-text-primary">
          Securing your selection
        </h1>
        
        <p className="mt-3 font-ui text-sm leading-relaxed text-text-secondary">
          We are preparing your permanent access. You are being redirected to Lemon Squeezy.
        </p>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-300">
          <span className="h-px w-6 bg-kyn-slate-100" />
          The Handoff
          <span className="h-px w-6 bg-kyn-slate-100" />
        </div>
      </div>
    </main>
  );
}
