/**
 * KYNAR UNIVERSE: Checkout Success (v1.5)
 * Role: Affirmation of Ownership & Transition to Library.
 * Aligned with: UX Canon Section 6 (Ownership) & Master Experience Loop.
 */

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { confetti } from "@/lib/utils/confetti"; 
import { Check, ArrowRight, Library as LibraryIcon } from "lucide-react";

export default function CheckoutSuccessPage() {
  
  useEffect(() => {
    // Subtle, grounded celebration using the Earthy-Cosmic palette
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#166534', '#C9A07D', '#F1F5F9'] // Kyn-Green, Caramel, Slate-100
    });
  }, []);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center animate-in fade-in zoom-in-95 duration-700 ease-out">
      
      {/* Ownership Signal: Grounded & Reassured */}
      <div className="mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-kyn-green-50/50 border border-kyn-green-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kyn-green-600 text-white">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
      </div>

      <header className="max-w-md space-y-4">
        <h1 className="font-brand text-4xl font-medium tracking-tight text-kyn-slate-900 md:text-5xl">
          It is now yours.
        </h1>
        <p className="font-ui text-base leading-relaxed text-kyn-slate-500">
          Your selection has been added to your vault. These tools are now a permanent part of your digital home.
        </p>
      </header>

      <div className="mt-16 flex w-full max-w-sm flex-col gap-5">
        {/* Primary Flow: Transition to Belonging */}
        <Link 
          href="/library"
          className="group flex items-center justify-center gap-3 rounded-xl bg-kyn-slate-900 py-5 font-brand text-base font-medium text-white transition-all duration-300 hover:bg-black active:scale-[0.98] shadow-sm"
        >
          <LibraryIcon className="h-5 w-5 opacity-70" />
          Access Your Library
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>

        {/* Secondary Flow: Return to Exploration */}
        <Link 
          href="/store" 
          className="font-ui py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors duration-300"
        >
          Return to Universe Hub
        </Link>
      </div>

      {/* Confirmation Detail: Trust Building */}
      <footer className="mt-24 max-w-xs border-t border-border pt-10">
        <p className="font-ui text-[11px] leading-relaxed italic text-kyn-slate-400">
          A receipt and ownership certificate have been sent to your email. Your access never expires.
        </p>
      </footer>
    </div>
  );
}
