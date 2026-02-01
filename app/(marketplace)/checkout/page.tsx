import { redirect } from "next/navigation";
import { generateCheckoutUrl } from "@/lib/lemon-squeezy/checkout";
import { createClient } from "@/lib/supabase/server";

/**
 * KYNAR UNIVERSE: Checkout Gateway (v1.5)
 * Final Alignment: TypeScript Strict Typing & Next.js 15 Async
 */

interface Product {
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
  // 1. Await SearchParams (Next.js 15 Requirement)
  const params = await searchParams;
  const rawItems = params.items;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Identity Guard
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

  // 2. Data Fetching
  const { data, error } = await supabase
    .from("products")
    .select("id, title, price_id, slug") 
    .in("id", productIds);

  const products = (data as Product[]) || [];

  if (products.length === 0 || error) {
    redirect("/cart?error=selection_not_found");
  }

  // 3. Prepare Metadata for Webhook fulfillment
  const productIdsString = products.map(p => p.id).join(',');

  // 4. Secure Handoff Generation
  let checkoutUrl: string | null = null;
  try {
    checkoutUrl = await generateCheckoutUrl({
      products: products.map((p: Product) => ({
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
        product_ids: productIdsString, // Critical for the Webhook to grant access
        context: "kynar_vault_transaction"
      }
    });
  } catch (err) {
    console.error("Checkout Handoff Error:", err);
    redirect("/cart?error=checkout_failed");
  }

  if (checkoutUrl) {
    redirect(checkoutUrl);
  }

  // 5. Noble UI Fallback (The actual visible part)
  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 text-center bg-canvas">
      <div className="max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
        <div className="mx-auto mb-8 h-12 w-12 rounded-full border border-border bg-surface flex items-center justify-center">
          <div className="h-2 w-2 animate-ping rounded-full bg-kyn-green-500" />
        </div>
        <h1 className="font-brand text-xl font-medium tracking-tight text-kyn-slate-900">
          Securing Selection
        </h1>
        <p className="mt-3 font-ui text-sm leading-relaxed text-kyn-slate-500">
          Preparing permanent access to your vault. Redirecting to secure gateway.
        </p>
      </div>
    </main>
  );
}
