"use client";

export const dynamic = "force-dynamic";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, Trash2, Lock, ShieldCheck, Loader2, Sparkles, Scale } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { processCheckout } from './actions';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  // PHASE 4: Initialized to false as the checkbox is hidden during preview
  const [hasConsented, setHasConsented] = useState(false); 
  const router = useRouter();

  async function handleCheckout() {
    // PHASE 1: Hard return to disable real checkout actions
    return;
    
    /* setIsProcessing(true);
    const productSlugs = cartItems.map(item => item.slug);
    const result = await processCheckout(productSlugs);

    if (result.error) {
      setIsProcessing(false);
      if (result.error === "unauthorized") {
        router.push('/account?message=please_login');
      } else {
        alert(result.error);
      }
    } else {
      clearCart();
      router.push('/account?verified=true');
    }
    */
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-brand-base flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="brand-card p-12 md:p-24 max-w-2xl w-full shadow-tactile"
        >
          <div className="w-20 h-20 bg-brand-base rounded-inner flex items-center justify-center mx-auto mb-10 text-brand-text/10">
            <ShoppingCart size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-brand-text mb-6 tracking-tight">
            Your selection is empty
          </h1>
          <p className="text-brand-text/40 mb-12 leading-relaxed max-w-sm mx-auto">
            Explore the Muse collection to preview premium digital solutions for your workflow.
          </p>
          <Link 
            href="/marketplace" 
            className="btn-primary inline-flex items-center gap-3"
          >
            Browse Collection <ArrowRight size={16} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-base py-24 px-6 selection:bg-brand-accent/20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-semibold text-brand-text tracking-tight mb-4">
            Order Manifest
          </h1>
          <p className="text-brand-text/40 font-medium">Review your selection. Access will unlock shortly.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* LEFT: SELECTION LIST (Physical Depth) */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="brand-card p-6 md:p-8 flex gap-6 md:gap-10 items-center shadow-tactile-hover group"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-base rounded-inner overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                  </div>

                  <div className="flex-grow">
                    <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-2">{item.category}</div>
                    <h3 className="font-semibold text-xl md:text-2xl text-brand-text tracking-tight leading-none">{item.title}</h3>
                    <p className="text-[11px] text-brand-text/30 font-medium uppercase tracking-widest mt-3">Preview Mode</p>
                  </div>

                  <div className="flex flex-col items-end gap-6">
                    <p className="font-semibold text-2xl text-brand-text tracking-tight">£{item.price}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-brand-text/10 hover:text-brand-text transition-colors"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: ORDER SUMMARY (Mocha Surface) */}
          <div className="lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="brand-card p-10 surface-mocha shadow-tactile"
            >
              <h2 className="text-[10px] font-bold text-brand-text/30 mb-10 tracking-[0.3em] uppercase">Selection Summary</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-[11px] font-bold text-brand-text/40 uppercase tracking-widest">
                  <span>Items Total</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-accent text-[11px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2">Registration Status</span>
                  <span>Preview</span>
                </div>
                <div className="pt-8 border-t border-brand-surface/20 flex justify-between items-end">
                  <span className="text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.2em] pb-1">Value</span>
                  <span className="text-5xl font-semibold text-brand-text tracking-tight">£{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* PHASE 4: Checkout consent hidden until payments exist */}
              {/* This confuses users during a pre-sale/preview period */}
              
              {/* ACTION BUTTON */}
              <button 
                onClick={handleCheckout}
                disabled={true} // Hard-disabled for Preview Mode
                className="btn-primary w-full py-6 flex items-center justify-center opacity-40 cursor-not-allowed group mb-10"
              >
                <span className="flex items-center gap-2">Unlocking Soon <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>

              <div className="flex flex-col gap-5 border-t border-brand-surface/20 pt-8">
                <div className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-text/20">
                  <ShieldCheck size={14} /> Registry Preview
                </div>
                <div className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-text/20">
                  <Scale size={14} /> UK Digital Standards
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
