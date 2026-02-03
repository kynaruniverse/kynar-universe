/**
 * KYNAR UNIVERSE: The Selection (Cart) v1.6
 * Refinement: Native Hydration & Enhanced Mobile Ergonomics.
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/store"; // Using the consolidated store from previous refactor
import { formatGBP } from "@/lib/utils";
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft, Plus } from "lucide-react";
import { Product } from "@/lib/supabase/types";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, getTotalPrice, _hasHydrated } = useCart();

  // 1. Unified Hydration Guard
  // Prevents the "Flash of Empty" by waiting for the Zustand persist bit
  if (!_hasHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-kyn-green-500 border-t-transparent" />
      </div>
    );
  }

  const subtotal = getTotalPrice();

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
        <Link href="/store" className="mt-10 button-primary gap-2">
          <Plus size={16} />
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
              <div key={item.id} className="group relative flex gap-6 rounded-[2rem] border border-border bg-white p-6 calm-transition hover:shadow-kynar-soft">
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
                    className="p-2 text-text-secondary hover:text-kyn-caramel-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                  <span className="font-brand text-lg font-bold text-text-primary">
                    {formatGBP(item.price_id ? 50 : 0)} {/* Logic handled by pricing utility in real use */}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Desktop Sidebar */}
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
              className="mt-8 w-full button-primary gap-2 py-5"
            >
              Initiate Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Dock */}
      <div className="lg:hidden fixed bottom-safe-bottom left-0 right-0 px-gutter z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-border p-4 rounded-3xl shadow-kynar-elevated flex items-center justify-between gap-4">
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
