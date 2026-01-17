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
  const [hasConsented, setHasConsented] = useState(false); 
  const router = useRouter();
  const dynamic = "force-dynamic";

  async function handleCheckout() {
    if (!hasConsented || isProcessing) return;
    
    setIsProcessing(true);
    // Aligning with our updated context: using item.slug as the product_id
    const productSlugs = cartItems.map(item => item.slug);
    const result = await processCheckout(productSlugs);

    if (result.error) {
      // If unauthorized, the action redirects or we handle it here
      setIsProcessing(false);
      if (result.error === "unauthorized") {
        router.push('/account?message=please_login');
      } else {
        alert(result.error);
      }
    } else {
      clearCart();
      // Redirect with verified flag to trigger the 'Vault' celebration
      router.push('/account?verified=true');
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-home-base flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/40 backdrop-blur-3xl p-12 md:p-20 rounded-[64px] border border-white/40 shadow-glass max-w-2xl w-full"
        >
          <div className="w-20 h-20 bg-white/60 rounded-[28px] flex items-center justify-center mx-auto mb-10 shadow-sm border border-black/5">
            <ShoppingCart className="w-8 h-8 text-primary-text/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase">
            Empty Sector
          </h1>
          <p className="font-serif text-lg text-primary-text/40 italic mb-12 leading-relaxed max-w-sm mx-auto">
            Your manifest is currently clear. Explore the marketplace to acquire new tools.
          </p>
          <Link 
            href="/marketplace" 
            className="inline-flex items-center px-12 py-5 bg-primary-text text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Explore Universe <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-home-base py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 space-y-2">
          <h1 className="text-6xl md:text-8xl font-black font-sans text-primary-text tracking-tighter uppercase leading-[0.8]">
            Manifest
          </h1>
          <p className="text-lg font-serif italic text-primary-text/40">Review your acquisition before transmission.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT: ITEM LIST */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/40 backdrop-blur-2xl p-6 md:p-8 rounded-[48px] border border-white/40 flex gap-6 md:gap-10 items-center shadow-glass group relative"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/60 rounded-[32px] overflow-hidden flex-shrink-0 border border-black/5 shadow-inner">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-grow">
                    <div className="text-[10px] font-black text-home-accent uppercase tracking-widest mb-1">{item.category}</div>
                    <h3 className="font-black font-sans text-xl md:text-3xl text-primary-text tracking-tight uppercase leading-none">{item.title}</h3>
                    <p className="text-xs font-serif text-primary-text/40 italic mt-2">Digital License — Immediate Access</p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <p className="font-black text-2xl md:text-3xl text-primary-text tracking-tighter">£{item.price}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-primary-text/10 hover:text-red-500 hover:bg-red-50/50 rounded-full transition-all active:scale-90"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: SUMMARY & LEGAL CONSENT */}
          <div className="lg:sticky lg:top-28">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/40 backdrop-blur-3xl p-10 rounded-[56px] border border-white/40 shadow-glass"
            >
              <h2 className="text-[10px] font-black font-sans text-primary-text/30 mb-10 tracking-[0.4em] uppercase">Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[10px] font-black text-primary-text/30 uppercase tracking-widest">
                  <span>Acquisition Subtotal</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-home-accent text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><Sparkles size={12}/> Global Transmission</span>
                  <span>Included</span>
                </div>
                <div className="pt-8 border-t border-black/5 flex justify-between items-end">
                  <span className="text-[10px] font-black text-primary-text/20 uppercase tracking-[0.3em] pb-1">Total</span>
                  <span className="text-5xl font-black text-primary-text tracking-tighter">£{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* MANDATORY LEGAL CONSENT */}
              <div className="mb-10 space-y-4">
                <div 
                  className={`flex items-start gap-4 p-6 rounded-[32px] border transition-all duration-500 ${
                    hasConsented ? 'bg-home-accent/10 border-home-accent/20' : 'bg-white/20 border-black/5'
                  }`}
                >
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      id="legal-consent"
                      checked={hasConsented}
                      onChange={(e) => setHasConsented(e.target.checked)}
                      className="peer w-6 h-6 rounded-xl border-2 border-primary-text/10 bg-white/40 checked:bg-home-accent checked:border-home-accent transition-all cursor-pointer appearance-none"
                    />
                    <Check className="absolute w-4 h-4 left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
                  </div>
                  <label htmlFor="legal-consent" className="text-[11px] leading-relaxed text-primary-text/50 font-serif italic cursor-pointer select-none">
                    I agree to the <Link href="/terms" className="text-primary-text font-bold underline decoration-home-accent/30 underline-offset-4">Terms</Link> and consent to immediate access. I understand I waive my 14-day right to cancel once access begins.
                  </label>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button 
                onClick={handleCheckout}
                disabled={isProcessing || !hasConsented}
                className="w-full py-6 bg-primary-text text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-10 disabled:grayscale disabled:cursor-not-allowed group mb-8"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Secure Transmission <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-primary-text/20">
                  <Lock size={12} /> Secure Protocol
                </div>
                <div className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-primary-text/20">
                  <Scale size={12} /> UK Regulated
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Internal icon for the checkbox
function Check({ className, strokeWidth }: { className?: string, strokeWidth?: number }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
