"use client";

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
  const [hasConsented, setHasConsented] = useState(false); // Legal Consent State
  const router = useRouter();

  async function handleCheckout() {
    if (!hasConsented) return; // Guard clause for extra safety
    
    setIsProcessing(true);
    const productSlugs = cartItems.map(item => item.slug);
    const result = await processCheckout(productSlugs);

    if (result.error) {
      alert(result.error);
      router.push('/account');
      setIsProcessing(false);
    } else {
      clearCart();
      router.push('/account');
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-home-base flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/40 backdrop-blur-3xl p-10 md:p-16 rounded-[40px] border border-white/20 shadow-glass max-w-2xl w-full"
        >
          <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShoppingCart className="w-10 h-10 text-primary-text/40" />
          </div>
          <h1 className="text-4xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase">
            Empty Sector
          </h1>
          <p className="font-serif text-lg text-primary-text/60 italic mb-10 leading-relaxed max-w-sm mx-auto">
            Your basket is currently drifting in the void. Let's find some tools for your journey.
          </p>
          <Link 
            href="/marketplace" 
            className="inline-flex items-center px-10 py-4 bg-primary-text text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Explore Universe <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-home-base py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black font-sans text-primary-text tracking-tighter uppercase">
            Manifest
          </h1>
          <p className="text-lg font-serif italic text-primary-text/40 mt-2">Review your selected assets before transmission.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* LEFT: ITEM LIST */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/40 backdrop-blur-2xl p-5 md:p-6 rounded-[32px] border border-white/20 flex gap-4 md:gap-6 items-center shadow-glass group overflow-hidden relative"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/60 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5 shadow-inner">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-bold font-sans text-lg md:text-xl text-primary-text tracking-tight">{item.title}</h3>
                    <p className="text-xs md:text-sm font-serif text-primary-text/40 italic">Digital Manifest Item</p>
                    <div className="mt-2 md:hidden">
                       <p className="font-bold text-lg text-primary-text">£{item.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="hidden md:block font-black text-2xl text-primary-text tracking-tighter">£{item.price}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-primary-text/20 hover:text-red-500 hover:bg-red-50/50 rounded-full transition-all active:scale-90"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: SUMMARY & LEGAL CONSENT */}
          <div className="lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/40 backdrop-blur-3xl p-8 rounded-[40px] border border-white/40 shadow-glass"
            >
              <h2 className="text-2xl font-black font-sans text-primary-text mb-8 tracking-tighter uppercase">Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold text-primary-text/40 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-home-accent text-sm font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Sparkles size={14}/> Transmission</span>
                  <span>Calculated</span>
                </div>
                <div className="pt-6 border-t border-black/5 flex justify-between items-end">
                  <span className="text-sm font-bold text-primary-text/30 uppercase tracking-[0.2em]">Total</span>
                  <span className="text-4xl font-black text-primary-text tracking-tighter">£{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* MANDATORY LEGAL CONSENT CHECKBOX */}
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3 p-5 bg-home-accent/5 rounded-[24px] border border-home-accent/10 transition-colors">
                  <input 
                    type="checkbox" 
                    id="legal-consent"
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded-lg border-white/40 bg-white/20 text-home-accent focus:ring-home-accent cursor-pointer transition-all"
                  />
                  <label htmlFor="legal-consent" className="text-[11px] leading-relaxed text-primary-text/60 font-serif italic cursor-pointer select-none">
                    I agree to the <Link href="/terms" className="text-primary-text font-bold underline decoration-home-accent/30 underline-offset-2">Terms of Service</Link> and expressly consent to immediate access to the digital content. I understand that I will lose my 14-day right to cancel once download or access begins.
                  </label>
                </div>
              </div>

              {/* ACTION BUTTON (Disabled until consent is checked) */}
              <button 
                onClick={handleCheckout}
                disabled={isProcessing || !hasConsented}
                className="w-full py-5 bg-primary-text text-white font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-xl disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group mb-6"
              >
                {isProcessing ? (
                  <>Processing <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                ) : (
                  <>Secure Transmission <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-text/30">
                  <Lock size={12} /> Secure Protocol Active
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-text/30">
                  <ShieldCheck size={12} /> Encrypted Digital Access
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
