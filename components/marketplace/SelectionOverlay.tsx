"use client";

/**
 * KYNAR UNIVERSE: Selection Overlay (v1.4)
 * Role: Cart review & confirmation surface.
 */

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

import { useCartItems } from "@/lib/cart/store";
import { getPriceFromId } from "@/lib/marketplace/pricing";

interface SelectionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectionOverlay({ isOpen, onClose }: SelectionOverlayProps) {
  const { items, count, totalPrice, removeItem } = useCartItems();
  
  // Lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-kyn-slate-900/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[2.5rem] border border-border bg-white p-8 shadow-2xl animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-300">
        {/* ───────────── Header ───────────── */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-900 text-white shadow-lg shadow-kyn-slate-900/20">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">
                Selection
              </h3>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                {count} {count === 1 ? "Item" : "Items"} in Vault
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-kyn-slate-400 transition-all hover:bg-surface hover:text-kyn-slate-900"
          >
            <X size={24} />
          </button>
        </header>

        {/* ───────────── Items ───────────── */}
        <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface text-kyn-slate-200">
                <ShoppingBag size={32} />
              </div>
              <p className="font-brand text-lg font-bold text-kyn-slate-900">
                Your selection is empty
              </p>
              <p className="mt-1 max-w-[200px] font-ui text-sm text-text-secondary">
                Visit the Store to acquire tools for your ecosystem.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const price = getPriceFromId(item.price_id) ?? 0;

              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-5 rounded-3xl border border-transparent bg-surface/30 p-4 transition-all hover:border-border hover:bg-surface/50"
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white text-kyn-slate-400 shadow-sm">
                    <ShoppingBag size={20} />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-brand font-bold text-kyn-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="font-ui text-sm font-bold text-kyn-green-600">
                        £{price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-kyn-slate-300 transition-colors hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ───────────── Footer ───────────── */}
        {items.length > 0 && (
          <footer className="mt-4 border-t border-border bg-white pt-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="mb-1 block font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                  Total Investment
                </span>
                <span className="font-brand text-3xl font-bold text-kyn-slate-900">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-3 rounded-[2rem] bg-kyn-slate-900 py-5 font-brand font-bold text-white shadow-2xl shadow-kyn-slate-900/20 transition-all hover:bg-kyn-slate-800 active:scale-[0.98]"
            >
              Confirm Selection
              <ArrowRight size={18} />
            </Link>
          </footer>
        )}
      </div>
    </div>
  );
}