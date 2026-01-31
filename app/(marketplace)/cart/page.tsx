"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { formatGBP, getPriceFromId } from "@/lib/marketplace/pricing";
import { useCart } from "@/lib/cart/store";
import { Trash2, ShieldCheck, Lock } from "lucide-react";

/**
 * KYNAR UNIVERSE: Cart / Selection Review
 * Aligned with UX Canon Section 6 (Reflection Point)
 * Focus: Clarity, transparency, and reassurance of ownership.
 */
export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, getTotal } = useCart();
  const subtotal = getTotal();

  const handleCheckout = () => {
    // Encodes selection for the secure Gateway handoff
    const itemsParam = encodeURIComponent(JSON.stringify(items.map(i => i.id)));
    router.push(`/checkout?items=${itemsParam}`);
  };

  return (
    <div className="mx-auto max-w-2xl pb-32">
      <Breadcrumbs paths={[{ label: 'Selection', href: '/cart' }]} />
      
      <header className="px-gutter py-12 text-center md:py-20">
        <h1 className="font-brand text-3xl font-bold tracking-tight text-kyn-slate-900 md:text-4xl">
          Your Selection
        </h1>
        <p className="font-ui mt-3 text-sm text-text-secondary leading-relaxed">
          Review your tools before they become a permanent part of your Library.
        </p>
      </header>

      <section className="px-gutter">
        {items.length > 0 ? (
          <div className="space-y-10">
            {/* Item List - Design System Section 13 */}
            <div className="space-y-3">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex items-center justify-between gap-4 rounded-kynar border border-border bg-surface p-5 calm-transition hover:border-kyn-slate-200"
                >
                  <div className="flex flex-col">
                    <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                      {item.world} World
                    </span>
                    <span className="font-brand font-semibold text-kyn-slate-900">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-brand text-sm font-bold text-kyn-slate-900">
                      {formatGBP(getPriceFromId(item.price_id))}
                    </span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-kyn-slate-300 hover:text-kyn-caramel-600 calm-transition"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Block - Business Reference Section 7 */}
            <div className="rounded-kynar border border-border bg-canvas p-8 shadow-kynar-soft">
              <div className="flex justify-between items-end border-b border-border pb-6">
                <span className="font-ui text-sm font-medium text-text-secondary">Total</span>
                <span className="font-brand text-2xl font-bold text-kyn-slate-900">{formatGBP(subtotal)}</span>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-kyn-slate-500 font-ui">
                  <ShieldCheck size={14} className="text-kyn-green-600" />
                  <span>One-time payment for lifetime ownership.</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-kyn-slate-500 font-ui">
                  <Lock size={14} className="text-kyn-slate-400" />
                  <span>Secure transaction handled by Lemon Squeezy.</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="mt-8 w-full rounded-kynar bg-kyn-slate-900 py-4 font-brand text-base font-bold text-white calm-transition hover:bg-kyn-slate-800 active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          /* Reassured Empty State - UX Canon Section 1 */
          <div className="flex flex-col items-center justify-center rounded-kynar border-2 border-dashed border-border py-24 text-center bg-surface/50">
            <div className="mb-6 h-12 w-12 rounded-full bg-canvas flex items-center justify-center text-2xl opacity-40">
              🌿
            </div>
            <p className="font-ui text-sm text-text-secondary">Your selection is currently empty.</p>
            <Link 
              href="/store" 
              className="mt-8 inline-block rounded-kynar bg-kyn-slate-900 px-10 py-4 font-brand text-sm font-bold text-white hover:bg-kyn-slate-800 calm-transition"
            >
              Explore Hub
            </Link>
          </div>
        )}
      </section>

      {/* Footer Markers - UX Canon Section 2.1 */}
      <footer className="mt-24 px-gutter">
        <div className="flex justify-center items-center gap-8 py-8 border-t border-border opacity-40">
           <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-500">UK-First Support</span>
           <span className="h-1 w-1 rounded-full bg-border" />
           <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-500">VAT Included</span>
        </div>
      </footer>
    </div>
  );
}
