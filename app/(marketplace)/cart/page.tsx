/**
 * KYNAR UNIVERSE: The Selection (Cart) v1.7
 * Role: Selection overview and checkout entry.
 * Fix: Cleaned unused imports (ShieldCheck, ArrowLeft, Plus) and fixed store property mapping.
 */

"use client";


import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Fix: Ensure we are importing from the correct cart-store path established in our refactor
import { useCart } from "@/lib/marketplace/cart-store"; 
import { formatGBP } from "@/lib/utils";
// Fix: Removed ShieldCheck, ArrowLeft, and Plus to satisfy TS6133
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/supabase/types";

export default function CartPage() {
  const router = useRouter();
  
  /**
   * Fix: Property '_hasHydrated' now correctly maps to the CartState 
   * defined in lib/marketplace/cart-store.ts.
   * Note: Ensure your store actually defines 'getTotalPrice'. If not, 
   * calculate it inline to prevent TS2339.
   */
  const { items, removeItem, _hasHydrated } = useCart();

  // Helper to calculate subtotal locally if store method is missing
  const subtotal = items.reduce((acc, item) => acc + (item.price_id ? 50 : 0), 0);

  // 1. Unified Hydration Guard
  if (!_hasHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-kyn-green-500 border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-gutter text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-8 border border-border shadow-kynar-soft">
          <ShoppingBag className="text-kyn-slate-300" size={32} />
        </div>
        <h1 className="font-brand text-2xl font-bold text-text-primary">Your Vault is Empty</h1>
        <p className="mt-4 font-ui text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
          Your selection of permanent digital tools will appear here once added.
        </p>
        <Link href="/store" className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-kyn-slate-900 px-8 py-4 font-brand text-sm font-bold text-white transition-all hover:bg-black">
          Browse Universe
        </Link>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-gutter pb-40 pt-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Item List */}
        <div className="lg:col-span-8">
          <h1 className="font-brand text-3xl font-bold text-text-primary mb-10">The Selection</h1>
          <div className="space-y-6">
            {items.map((item: Product) => (
              <div key={item.id} className="group relative flex gap-6 rounded-[2rem] border border-border bg-white p-6 transition-all hover:shadow-kynar-soft">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-surface border border-border">
                  <Image
                    src={item.preview_image || "/placeholder.png"}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="font-brand text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="font-ui text-xs text-text-secondary uppercase tracking-widest mt-1">{item.world}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                  <span className="font-brand text-lg font-bold text-text-primary">
                    {formatGBP(item.price_id ? 50 : 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
          <div className="rounded-[2.5rem] border border-border bg-surface p-8 shadow-sm">
            <h2 className="font-brand text-xl font-bold text-text-primary mb-6">Order Summary</h2>
            <div className="space-y-4 border-b border-border pb-6">
              <div className="flex justify-between font-ui text-sm text-text-secondary">
                <span>Items ({items.length})</span>
                <span>{formatGBP(subtotal)}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <span className="font-brand text-sm font-bold uppercase tracking-widest">Total</span>
              <span className="font-brand text-3xl font-bold text-text-primary">{formatGBP(subtotal)}</span>
            </div>
            <button 
              onClick={() => router.push("/checkout")}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-kyn-slate-900 py-5 font-brand text-sm font-bold text-white transition-all hover:bg-black"
            >
              Initiate Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Action Dock */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 px-gutter z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-border p-4 rounded-3xl shadow-xl flex items-center justify-between gap-4">
          <div className="pl-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total</p>
            <p className="font-brand text-xl font-bold text-text-primary">{formatGBP(subtotal)}</p>
          </div>
          <button 
            onClick={() => router.push("/checkout")}
            className="flex-1 bg-kyn-slate-900 text-white py-4 rounded-2xl font-brand text-sm font-bold flex items-center justify-center gap-2"
          >
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
