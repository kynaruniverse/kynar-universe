"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Sparkles, Library, ArrowRight, Orbit } from 'lucide-react';
import { useCart } from '@/context/CartContext';

/**
 * SuccessPage: The Post-Purchase Gratification Screen
 * Aligned with Brand Strategy 1.1: Converting a "Sale" into a "Beginning."
 */
export default function SuccessPage() {
  const { clearCart } = useCart();

  // Reset the commercial state to maintain a clean UX for the next exploration
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Atmosphere - Focus on the 'Universe' expansion */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.08)_0%,transparent_70%)] pointer-events-none" />
      <Orbit className="absolute top-20 -right-20 w-64 h-64 text-kyn-slate-100 dark:text-kyn-slate-800/50 rotate-45 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Animated Success Seal */}
        <div className="w-24 h-24 bg-white dark:bg-kyn-slate-800 rounded-kyn flex items-center justify-center mx-auto mb-10 shadow-kyn-lift border border-kyn-green-100 dark:border-kyn-green-900/30 animate-in zoom-in duration-700">
          <CheckCircle className="text-kyn-green-500" size={48} strokeWidth={1.5} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-600 dark:text-kyn-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <Sparkles size={14} />
          <span>Access Granted</span>
        </div>

        <h1 className="text-4xl font-black text-kyn-slate-900 dark:text-white uppercase tracking-tighter mb-4 leading-[0.9]">
          Welcome to your <br />
          <span className="text-kyn-green-500">new world.</span>
        </h1>

        <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 mb-12 italic font-medium leading-relaxed">
          "Your digital asset has been successfully secured in the Kynar Vault. Your journey toward order begins now."
        </p>

        {/* Primary Navigation Actions */}
        <div className="space-y-4">
          <Link 
            href="/library" 
            className="w-full bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-kyn-lift active:scale-95 transition-all group"
          >
            <Library size={16} />
            Open My Library
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/" 
            className="block py-4 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors"
          >
            Return to Universe Home
          </Link>
        </div>

        {/* Transactional Footer */}
        <div className="mt-16 p-6 bg-white/50 dark:bg-kyn-slate-800/50 rounded-3xl border border-kyn-slate-100 dark:border-kyn-slate-800 backdrop-blur-sm">
          <p className="text-[9px] text-kyn-slate-400 font-bold uppercase tracking-widest leading-loose">
            Confirmation email dispatched <br />
            VAT Receipt attached • Lifetime Access
          </p>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
        <Orbit size={20} className="animate-spin-slow text-kyn-slate-400" />
      </div>
    </div>
  );
}
