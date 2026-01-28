"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { redirectToCheckout } from '@/lib/commerce';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

/**
 * CartPage: Pre-Purchase Manifest
 * Aligned with Brand Strategy 3.1: "The cart is a pause for clarity."
 */
export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // For LS, we typically initiate checkout for the first item or a bundled variant
    redirectToCheckout({
      variantId: cart[0].ls_variant_id,
      userId: user?.id,
      userEmail: user?.email,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 flex flex-col items-center justify-center px-6 pt-20">
        <div className="w-20 h-20 bg-kyn-slate-50 dark:bg-kyn-slate-800 rounded-full flex items-center justify-center mb-8 border border-dashed border-kyn-slate-200 dark:border-kyn-slate-700">
          <ShoppingBag className="text-kyn-slate-300" size={32} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 text-kyn-slate-900 dark:text-white">Your Manifest is Empty</h1>
        <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 mb-10 max-w-xs text-center italic">
          "Order begins with selection. Explore the worlds to find your first asset."
        </p>
        <Link 
          href="/store" 
          className="bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-kyn-lift flex items-center gap-3 active:scale-95 transition-all"
        >
          Return to Store <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pt-32 pb-40 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Item List */}
        <div className="lg:col-span-7 space-y-8">
          <header className="mb-10">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white leading-none">Your Cart</h1>
            <p className="text-[10px] font-black text-kyn-green-600 uppercase tracking-[0.25em] mt-3">Selected Digital Assets</p>
          </header>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="kyn-card p-6 flex items-center gap-6 bg-white dark:bg-kyn-slate-800 border-kyn-slate-50 dark:border-kyn-slate-700">
                <div className="w-24 h-24 bg-kyn-slate-50 dark:bg-kyn-slate-900 rounded-2xl overflow-hidden shrink-0 border border-kyn-slate-100 dark:border-kyn-slate-700">
                  <img src={item.thumbnail_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow min-w-0">
                  <span className="text-[8px] font-black uppercase tracking-widest text-kyn-slate-400 mb-1 block">{item.world} World</span>
                  <h3 className="font-black text-xl text-kyn-slate-900 dark:text-white uppercase leading-tight truncate">{item.name}</h3>
                  <p className="text-[10px] font-medium text-kyn-slate-500 italic mt-1 line-clamp-1">{item.hero_benefit}</p>
                  <p className="text-sm font-black text-kyn-green-600 mt-3">£{item.price_gbp}</p>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-4 text-kyn-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 p-10 bg-kyn-slate-900 dark:bg-white rounded-[2.5rem] text-white dark:text-kyn-slate-900 shadow-2xl overflow-hidden relative">
            <Zap className="absolute -top-10 -right-10 w-40 h-40 text-white/5 dark:text-kyn-slate-900/5 rotate-12" />
            
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-10">Investment Summary</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="opacity-60">Subtotal</span>
                <span>£{totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="opacity-60">Fulfillment</span>
                <span className="text-kyn-green-400 dark:text-kyn-green-600">Instant</span>
              </div>
              <div className="h-px bg-white/10 dark:bg-kyn-slate-100 w-full" />
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Total</span>
                <span className="text-4xl font-black tracking-tighter leading-none">£{totalPrice}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-kyn-green-500 hover:bg-kyn-green-400 text-kyn-slate-900 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Secure Checkout <ArrowRight size={18} />
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
              <ShieldCheck size={14} />
              <span className="text-[8px] font-black uppercase tracking-widest">Encrypted via Lemon Squeezy</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
