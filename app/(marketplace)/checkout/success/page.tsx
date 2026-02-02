"use client";

/**
 * KYNAR UNIVERSE: Checkout Success (v1.6)
 * Role: Affirmation of Ownership & Transition to Library.
 * Aligned with: UX Canon Section 6 (Ownership) & Master Experience Loop.
 * Update: Integrated async triggerCelebration for Next.js 15 optimization.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/store";
import { triggerCelebration } from "@/lib/utils/confetti"; 
import { Check, ArrowRight, Library as LibraryIcon, ShieldCheck } from "lucide-react";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 1. Clear selection upon successful acquisition
    clearCart();

    // 2. Trigger Grounded Joy
    // We use an async IIFE inside the effect to handle the dynamic import
    const celebrate = async () => {
      // Small delay ensures the entrance animation is visible before confetti fires
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      await triggerCelebration({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.65 }
      });
    };

    celebrate();
  }, [clearCart]);

  // Prevent hydration mismatch by returning null during first pass
  if (!mounted) return null;

  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center px-gutter text-center">
      {/* Entrance Animation: Design System Section 11 */}
      <div className="animate-in fade-in zoom-in-95 duration-1000 ease-kyn-out flex flex-col items-center">
        
        {/* Ownership Signal: Grounded & Reassured */}
        <div className="relative mb-12">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-kyn-green-50/50 border border-kyn-green-100 shadow-kynar-soft">
            <div className="flex h-14 w-14 animate-pulse-slow items-center justify-center rounded-full bg-kyn-green-600 text-white shadow-lg">
              <Check className="h-7 w-7" strokeWidth={3} />
            </div>
          </div>
          <div className="absolute -right-2 -top-2 rounded-full bg-white p-2 shadow-sm border border-border">
            <ShieldCheck size={16} className="text-kyn-green-500" />
          </div>
        </div>

        <header className="max-w-md space-y-6">
          <h1 className="font-brand text-4xl font-bold tracking-tight text-kyn-slate-900 md:text-6xl">
            It is now <span className="italic">yours.</span>
          </h1>
          <p className="font-ui text-base leading-relaxed text-text-secondary md:text-lg">
            Your selection has been harmonized with your vault. These tools are now a permanent part of your digital estate.
          </p>
        </header>

        {/* Action Zone: Optimized for Mobile Thumb Reach */}
        <div className="mt-16 flex w-full max-w-sm flex-col gap-4">
          <Link 
            href="/library"
            className="group flex items-center justify-center gap-3 rounded-2xl bg-kyn-slate-900 py-5 font-brand text-base font-bold text-white transition-all duration-300 hover:bg-black active:scale-[0.97] shadow-xl"
          >
            <LibraryIcon className="h-5 w-5 opacity-70 group-hover:rotate-3 transition-transform" />
            Access Your Library
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>

          <Link 
            href="/store" 
            className="font-ui py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors duration-300"
          >
            Return to Universe Hub
          </Link>
        </div>

        {/* Trust Footer: Design System Section 19 */}
        <footer className="mt-28 max-w-xs border-t border-border pt-12">
          <div className="flex flex-col items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-kyn-green-500" />
            <p className="font-ui text-[11px] leading-relaxed italic text-kyn-slate-400">
              A permanent ownership certificate and receipt have been dispatched to your email. Access never expires.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
