"use client";

/**
 * KYNAR UNIVERSE: Selection & Acquisition (v2.2)
 * Role: Final review stage before checkout.
 * Fix: Implemented Safe Mounted Pattern for total synchronization.
 */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ChevronLeft } from "lucide-react";
import { useCartItems, useCartActions } from "@/lib/marketplace/cart-store";
import { getPriceFromId } from "@/lib/marketplace/pricing";
import { formatGBP, hapticFeedback } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  
  // Safe Hook consumption
  const { items, count, isEmpty } = useCartItems();
  const { removeItem, clearCart } = useCartActions();

  // 1. Prevent Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Calculate totals only after mount to ensure price_id mapping is synced
  const totalPrice = mounted 
    ? items.reduce((sum, item) => sum + getPriceFromId(item.price_id), 0)
    : 0;

  // Placeholder: Prevents layout shift and mismatch during SSR
  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-gutter py-12">
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-gutter text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface text-kyn-slate-300">
          <ShoppingBag size={32} />
        </div>
        <h1 className="font-brand text-2xl font-bold text-kyn-slate-900">Your selection is empty</h1>
        <p className="mt-2 font-ui text-text-secondary">Explore the universe to find your next tool.</p>
        <Link 
          href="/store" 
          className="mt-8 rounded-xl bg-kyn-slate-900 px-8 py-3 font-brand text-sm font-bold text-white transition-transform active:scale-95"
        >
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-gutter py-8 pb-32">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/store" className="group mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-kyn-slate-900">
            <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Store
          </Link>
          <h1 className="font-brand text-3xl font-bold text-kyn-slate-900">Your Selection</h1>
        </div>
        <button 
          onClick={() => { hapticFeedback('medium'); clearCart(); }}
          className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600"
        >
          Clear All
        </button>
      </header>

      {/* Item List */}
      <div className="space-y-4">
        {items.map((product) => {
          const price = getPriceFromId(product.price_id);
          
          return (
            <div 
              key={product.id} 
              className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition-all hover:shadow-kynar-soft"
            >
              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
                {product.image_url && (
                  <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate font-brand text-sm font-bold text-kyn-slate-900">{product.title}</h3>
                <p className="text-xs text-text-secondary capitalize">{product.world} • {product.file_type}</p>
              </div>

              <div className="text-right">
                <p className="font-brand text-sm font-bold text-kyn-slate-900">
                  {price === 0 ? "Free" : formatGBP(price)}
                </p>
                <button 
                  onClick={() => { hapticFeedback('light'); removeItem(product.id); }}
                  className="mt-1 text-kyn-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Summary Footer */}
      <footer className="fixed bottom-20 left-0 z-40 w-full px-gutter md:bottom-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-kyn-slate-900 p-6 shadow-kynar-deep text-white">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Total Amount</p>
              <p className="font-brand text-2xl font-bold">{formatGBP(totalPrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Items</p>
              <p className="font-brand text-2xl font-bold">{count}</p>
            </div>
          </div>
          
          <button 
            onClick={() => hapticFeedback('success')}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-kyn-green-500 py-4 font-brand text-sm font-bold text-white transition-all hover:bg-kyn-green-600 active:scale-[0.98]"
          >
            Proceed to Checkout
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </footer>
    </div>
  );
}
