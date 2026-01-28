"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, X, ArrowRight, Lock } from 'lucide-react';
import { redirectToCheckout } from '@/lib/commerce';

export const MiniCart = () => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  /**
   * Calm Confidence Logic (UX Guide 11.2): 
   * Lock body scroll when the cart overlay is active.
   */
  useEffect(() => {
    if (cart.length > 0 && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [cart.length, isOpen]);

  // If the cart is empty or user manually closed it, stay hidden
  if (cart.length === 0 || !isOpen) return null;

  const handleCheckout = () => {
    // Fulfillment Logic: Targeted checkout for the most recently added asset
    const product = cart[cart.length - 1];
    
    redirectToCheckout({
      variantId: product.ls_variant_id,
      userId: user?.id,
      userEmail: user?.email
    });
  };

  return (
    <>
      {/* Background Overlay for focus */}
      <div 
        className="fixed inset-0 bg-kyn-slate-900/20 backdrop-blur-sm z-50 animate-in fade-in duration-300" 
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-x-4 bottom-24 z-[60] animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white dark:bg-kyn-slate-900 shadow-kyn-lift dark:shadow-none border border-kyn-slate-100 dark:border-kyn-slate-800 rounded-kyn p-6 overflow-hidden">
          
          {/* Header (Visual Guide 1.1 Alignment) */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-kyn-green-50 dark:bg-kyn-green-900/30 rounded-full flex items-center justify-center text-kyn-green-600">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-kyn-slate-900 dark:text-white">
                  Your Universe
                </h3>
                <p className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-tighter">
                  {cart.length} Asset{cart.length > 1 ? 's' : ''} Selected
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-800 rounded-full transition-colors text-kyn-slate-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Item List (Editorial Pattern) */}
          <div className="space-y-3 max-h-40 overflow-y-auto no-scrollbar mb-6">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center bg-kyn-canvas dark:bg-kyn-slate-800/50 p-3 rounded-2xl border border-kyn-slate-50 dark:border-kyn-slate-800 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-kyn-slate-900 dark:text-white">{item.name}</span>
                  <span className="text-[10px] font-black text-kyn-green-600 uppercase tracking-widest">{item.world}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black">£{item.price_gbp}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-kyn-slate-300 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Area (Commerce Bridge 2.0) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400">Total Investment</span>
              <span className="text-xl font-black text-kyn-slate-900 dark:text-white">£{totalPrice}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all group shadow-lg"
            >
              <Lock size={14} className="text-kyn-green-500" />
              Secure Checkout
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[9px] text-center text-kyn-slate-400 font-medium tracking-wide">
              Secure Checkout • Instant Digital Vault Access
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
