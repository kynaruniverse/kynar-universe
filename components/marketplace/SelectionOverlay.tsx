"use client";

import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus } from "lucide-react";
import { useCartItems } from "@/lib/marketplace/cart-store";
import Link from "next/link";

interface SelectionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectionOverlay({ isOpen, onClose }: SelectionOverlayProps) {
  const { items, count, totalPrice, removeItem, updateQuantity } = useCartItems();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-canvas/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Side Drawer Container */}
      <div className="relative h-full w-full max-w-md border-l border-border bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kyn-slate-900 text-white">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="font-brand text-xl font-bold">Selection</h3>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                {count} {count === 1 ? 'Item' : 'Items'} Ready
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="h-16 w-16 bg-surface rounded-full flex items-center justify-center mb-4 text-kyn-slate-300">
                <ShoppingBag size={24} />
              </div>
              <p className="font-brand font-bold text-kyn-slate-900">Your selection is empty</p>
              <p className="font-ui text-sm text-text-secondary mt-1">Explore the Store to add tools.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="h-20 w-20 rounded-2xl bg-surface border border-border overflow-hidden flex-shrink-0">
                   {/* Replace with your Item Image logic */}
                   <div className="w-full h-full bg-kyn-slate-50 flex items-center justify-center text-kyn-slate-300">
                      <ShoppingBag size={20} />
                   </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-brand font-bold text-kyn-slate-900 leading-tight">{item.name}</h4>
                  <p className="text-kyn-green-600 font-ui font-bold text-sm mt-1">£{item.price}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-surface rounded-lg px-2 py-1 border border-border">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-kyn-green-600"><Minus size={14}/></button>
                      <span className="font-ui text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-kyn-green-600"><Plus size={14}/></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-kyn-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="pt-8 mt-4 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <span className="font-ui text-sm font-bold text-kyn-slate-400 uppercase tracking-widest">Total Investment</span>
              <span className="font-brand text-2xl font-bold text-kyn-slate-900">£{totalPrice}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={onClose}
              className="w-full flex items-center justify-center gap-3 py-5 bg-kyn-slate-900 text-white rounded-[2rem] font-brand font-bold hover:bg-kyn-slate-800 transition-all active:scale-[0.98]"
            >
              Continue to Checkout
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
