import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
      
      {/* 1. CONTAINER CARD */}
      <div className="bg-account-surface w-full max-w-2xl p-8 md:p-12 rounded-card shadow-sm border border-black/5 text-center">
        
        {/* 2. ICON */}
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
          <ShoppingCart className="w-10 h-10 opacity-80" />
        </div>

        {/* 3. HEADLINE */}
        <h1 className="text-3xl md:text-4xl font-bold font-sans text-primary-text mb-4 tracking-tight">
          Your basket is empty.
        </h1>
        
        {/* 4. SUBTEXT */}
        <p className="font-serif text-lg text-primary-text/70 mb-10 leading-relaxed max-w-md mx-auto">
          The shelves are full of tools to help you work and live better. Take a look around.
        </p>

        {/* 5. ACTION BUTTON */}
        <Link 
          href="/marketplace" 
          className="inline-flex items-center px-8 py-4 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-all hover:scale-105 shadow-md"
        >
          Return to Marketplace <ArrowRight className="ml-2 w-5 h-5" />
        </Link>

        {/* 6. LORE FOOTER */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-sm font-serif italic text-primary-text/50">
            "Start wherever feels right."
          </p>
        </div>

      </div>
    </main>
  );
}
