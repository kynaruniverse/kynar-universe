import Link from 'next/link';
import Section from '@/components/layout/Section';

/**
 * Checkout Success Page - Kynar Universe 2.0
 * Purpose:
 * - High-vibration confirmation of purchase
 * - Clear path to the user's Library
 * - Encourages "Calm" exploration
 */

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center animate-in fade-in duration-1000">
      <Section className="text-center space-y-10">
        
        {/* 1. Success Iconography */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-kyn-green-500/10 animate-ping absolute inset-0" />
            <div className="w-24 h-24 rounded-full bg-white border border-kyn-green-500/20 flex items-center justify-center relative">
              <div className="w-4 h-4 rounded-full bg-kyn-green-500" />
            </div>
          </div>
        </div>

        {/* 2. Affirmation */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-kyn-green-700 italic">
            Clarity Restored.
          </h1>
          <p className="text-sm text-kyn-slate-500 leading-relaxed max-w-[280px] mx-auto">
            Your payment was successful. The tool has been added to your permanent collection.
          </p>
        </div>

        {/* 3. Navigation Actions */}
        <div className="flex flex-col gap-4 pt-6">
          <Link 
            href="/library"
            className="w-full bg-kyn-green-700 text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-kyn-green-700/10 active:scale-95 transition-all"
          >
            Access Your Library
          </Link>
          
          <Link 
            href="/"
            className="py-2 text-[10px] uppercase tracking-widest text-kyn-slate-400 font-bold hover:text-kyn-green-700 transition-colors"
          >
            Back to Marketplace
          </Link>
        </div>

        {/* 4. Small Footer Note */}
        <p className="text-[9px] text-kyn-slate-400 italic">
          An email confirmation is on its way to your inbox.
        </p>

      </Section>
    </div>
  );
}
