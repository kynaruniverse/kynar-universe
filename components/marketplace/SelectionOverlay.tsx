"use client";

import { useEffect } from "react";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartItems } from "@/lib/cart/store";
import { getPriceFromId } from "@/lib/marketplace/pricing";
import Link from "next/link";

interface SelectionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectionOverlay({ isOpen, onClose }: SelectionOverlayProps) {
  const { items, count, totalPrice, removeItem } = useCartItems();

  // Prevent background scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Blurred Background Overlay - Fades in */}
      <div 
        className="absolute inset-0 bg-kyn-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Centered Modal - Zooms in from the background */}
      <div className="relative w-full max-w-lg max-h-[90vh] border border-border bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-300 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-900 text-white shadow-lg shadow-kyn-slate-900/20">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">Selection</h3>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                {count} {count === 1 ? 'Item' : 'Items'} in Vault
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-surface text-kyn-slate-400 hover:text-kyn-slate-900 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-20 w-20 bg-surface rounded-full flex items-center justify-center mb-6 text-kyn-slate-200">
                <ShoppingBag size={32} />
              </div>
              <p className="font-brand text-lg font-bold text-kyn-slate-900">Your selection is empty</p>
              <p className="font-ui text-sm text-text-secondary mt-1 max-w-[200px]">Visit the Store to acquire tools for your ecosystem.</p>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = getPriceFromId(item.price_id) ?? 0;
              
              return (
                <div key={item.id} className="flex gap-5 group items-center bg-surface/30 p-4 rounded-3xl border border-transparent hover:border-border hover:bg-surface/50 transition-all">
                  <div className="h-16 w-16 rounded-2xl bg-white border border-border overflow-hidden flex-shrink-0 flex items-center justify-center text-kyn-slate-400 shadow-sm">
                      <ShoppingBag size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-brand font-bold text-kyn-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-kyn-green-600 font-ui font-bold text-sm">
                        £{itemPrice.toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-kyn-slate-300 hover:text-red-500 transition-colors p-1"
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

        {/* Footer with Subtotal */}
        {items.length > 0 && (
          <div className="pt-8 mt-4 border-t border-border bg-white">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-ui text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest block mb-1">
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
              className="w-full flex items-center justify-center gap-3 py-5 bg-kyn-slate-900 text-white rounded-[2rem] font-brand font-bold hover:bg-kyn-slate-800 transition-all active:scale-[0.98] shadow-2xl shadow-kyn-slate-900/20"
            >
              Confirm Selection
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
