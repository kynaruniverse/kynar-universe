/* KYNAR UNIVERSE: app/(marketplace)/cart/page.tsx */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ChevronLeft } from "lucide-react";
import { useCartItems, useCartActions } from "@/lib/cart/store";
import { getPriceFromId } from "@/lib/marketplace/pricing";
import { formatGBP, hapticFeedback } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  
  const { items, count, isEmpty } = useCartItems();
  const { removeItem, clearCart } = useCartActions();

  // 1. Prevent Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Calculate totals safe from SSR mismatch & undefined pricing
  const totalPrice = mounted 
    ? items.reduce((sum, item) => {
        const price = getPriceFromId(item.price_id);
        return sum + (price ?? 0);
      }, 0)
    : 0;

  // The Loading State / SSR Placeholder
  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-gutter py-24">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-surface mb-8" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-2xl bg-surface" />
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (isEmpty) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-gutter text-center animate-in fade-in duration-700">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface text-kyn-slate-200">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-brand text-xl font-bold text-kyn-slate-900 uppercase tracking-widest">Selection Empty</h1>
        <p className="mt-2 font-ui text-[11px] uppercase tracking-[0.2em] text-kyn-slate-400">Your vault awaits new additions.</p>
        <Link 
          href="/store" 
          className="mt-10 rounded-xl bg-kyn-slate-900 px-10 py-4 font-brand text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95 shadow-xl shadow-kyn-slate-900/10"
        >
          Explore Store
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-gutter py-12 pb-48 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <header className="mb-12 flex items-end justify-between">
        <div>
          <Link href="/store" className="group mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors">
            <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Continue Browsing
          </Link>
          <h1 className="font-brand text-sm font-black uppercase tracking-[0.3em] text-kyn-slate-900">
            Selection Terminal
          </h1>
        </div>
        <button 
          onClick={() => { hapticFeedback('medium'); clearCart(); }}
          className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
        >
          Reset All
        </button>
      </header>

      {/* Item List */}
      <div className="space-y-3">
        {items.map((product) => {
          const price = getPriceFromId(product.price_id) ?? 0;
          
          return (
            <div 
              key={product.id} 
              className="group flex items-center gap-6 rounded-3xl border border-border bg-white p-5 transition-all hover:border-kyn-slate-200 hover:shadow-kynar-soft"
            >
              <div className="flex-1 min-w-0">
                <span className="font-ui text-[9px] font-bold uppercase tracking-[0.25em] text-kyn-slate-400">
                  {product.world}
                </span>
                <h3 className="truncate font-brand text-lg font-bold text-kyn-slate-900 mt-0.5">
                  {product.title}
                </h3>
              </div>

              <div className="flex items-center gap-6">
                <p className="font-brand text-sm font-bold text-kyn-slate-900">
                  {price === 0 ? "Free" : formatGBP(price)}
                </p>
                <button 
                  onClick={() => { hapticFeedback('light'); removeItem(product.id); }}
                  className="p-2 text-kyn-slate-200 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Summary Footer */}
      <footer className="fixed bottom-24 left-0 z-40 w-full px-gutter md:bottom-12">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] bg-kyn-slate-900 p-8 shadow-2xl shadow-kyn-slate-900/20 text-white">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Total Commitment</p>
              <p className="font-brand text-3xl font-bold">{formatGBP(totalPrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Units</p>
              <p className="font-brand text-3xl font-bold">{count}</p>
            </div>
          </div>
          
          <button 
            onClick={() => hapticFeedback('success')}
            className="group flex w-full items-center justify-center gap-4 rounded-2xl bg-kyn-green-500 py-5 font-brand text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-kyn-green-600 active:scale-[0.98] shadow-lg shadow-kyn-green-500/20"
          >
            Initiate Acquisition
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </footer>
    </div>
  );
}


