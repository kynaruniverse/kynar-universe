/**
 * KYNAR UNIVERSE: The Selection (Cart)
 * Role: Final review of digital assets before permanent acquisition.
 * Optimization: Hydration-safe rendering and Mobile-first "Thumb-Zone" actions.
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/store";
import { formatGBP, getPriceFromId } from "@/lib/marketplace/pricing";
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, getTotalPrice } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // 1. Hydration Guard: Ensure client-side localStorage matches UI
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-gutter text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-8 border border-border shadow-kynar-soft">
          <ShoppingBag className="text-kyn-slate-300" size={32} />
        </div>
        <h1 className="font-brand text-3xl font-bold text-text-primary">Your Vault is Empty</h1>
        <p className="font-ui text-text-secondary mt-4 max-w-xs leading-relaxed">
          No tools have been selected for your digital estate yet.
        </p>
        <Link 
          href="/store"
          className="mt-10 flex items-center gap-2 px-8 py-4 bg-kyn-slate-900 text-white rounded-xl font-brand text-sm font-bold hover:bg-black transition-all active:scale-95"
        >
          Explore the Hub
          <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas pb-40 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="max-w-screen-xl mx-auto px-gutter pt-8">
        <Breadcrumbs paths={[{ label: 'Selection', href: '/cart' }]} />

        <header className="py-12 border-b border-border">
          <h1 className="font-brand text-4xl font-bold text-text-primary">The Selection</h1>
          <p className="font-ui text-sm text-text-secondary mt-2">
            Review your assets before moving them to your permanent vault.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* List of Assets */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="group relative flex items-center gap-6 p-5 bg-white border border-border rounded-2xl shadow-kynar-soft hover:shadow-md transition-shadow"
              >
                <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                  <Image
                    src={item.preview_image || "/assets/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-brand text-base font-bold text-text-primary truncate">
                        {item.title}
                      </h3>
                      <p className="font-ui text-xs text-text-secondary mt-1">{item.world} Sector</p>
                    </div>
                    <p className="font-brand text-sm font-bold text-text-primary">
                      {formatGBP(getPriceFromId(item.price_id))}
                    </p>
                  </div>
                </div>

                {/* Accessible Touch Target for Removal */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-3 text-kyn-slate-300 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.title}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            
            <Link href="/store" className="inline-flex items-center gap-2 font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors py-4">
              <ArrowLeft size={14} />
              Continue Discovery
            </Link>
          </div>

          {/* Acquisition Summary */}
          <div className="lg:col-span-4">
            <div className="bg-surface border border-border rounded-3xl p-8 sticky top-24">
              <h2 className="font-brand text-xl font-bold text-text-primary mb-8">Acquisition Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-ui text-sm text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatGBP(subtotal)}</span>
                </div>
                <div className="flex justify-between font-ui text-sm text-text-secondary">
                  <span>Vault Allocation</span>
                  <span className="text-kyn-green-600 font-medium">Included</span>
                </div>
                <div className="pt-6 border-t border-border flex justify-between items-end">
                  <span className="font-brand text-sm font-bold uppercase tracking-wider text-text-secondary">Total Value</span>
                  <span className="font-brand text-3xl font-bold text-text-primary">{formatGBP(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => router.push("/checkout")}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-kyn-slate-900 text-white rounded-2xl font-brand text-sm font-bold hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-kyn-slate-900/10"
                >
                  Initiate Checkout
                  <ArrowRight size={18} />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[11px] font-ui text-text-secondary">
                  <ShieldCheck size={14} className="text-kyn-green-500" />
                  Secured by Kynar Digital Contract
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Bottom Dock (Floating Action) */}
      <div className="lg:hidden fixed bottom-24 left-0 right-0 px-gutter z-40 animate-in slide-in-from-bottom-8 duration-1000">
        <div className="bg-white/80 backdrop-blur-xl border border-border p-4 rounded-2xl shadow-kynar-elevated flex items-center justify-between gap-4">
          <div className="pl-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total</p>
            <p className="font-brand text-xl font-bold text-text-primary">{formatGBP(subtotal)}</p>
          </div>
          <button 
             onClick={() => router.push("/checkout")}
             className="flex-1 bg-kyn-slate-900 text-white py-4 rounded-xl font-brand text-sm font-bold flex items-center justify-center gap-2"
          >
            Checkout
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
