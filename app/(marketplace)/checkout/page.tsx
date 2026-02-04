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
  const params = await searchParams;
  const rawItems = params.items;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?return_to=/cart");
  }

  if (!rawItems) redirect("/cart");

  let productIds: string[] = [];
  try {
    productIds = JSON.parse(decodeURIComponent(rawItems));
  } catch (e) {
    console.error("Selection Parse Error:", e);
    redirect("/cart?error=invalid_selection");
  }

  const { data: products, error } = await (supabase
    .from("products")
    .select("id, title, price_id, slug, lemon_squeezy_id")
    .in("id", productIds) as any);

  if (error || !products || products.length === 0) {
    console.error("Verification Error:", error);
    redirect("/cart?error=verification_failed");
  }

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
        <h1 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900">
          Preparing Acquisition
        </h1>
        <p className="mt-4 font-ui text-sm leading-relaxed text-kyn-slate-400">
          Initializing secure checkout for your vault selection.
        </p>
      </div>
    </main>
  );
}
