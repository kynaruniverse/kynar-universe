'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Added usePathname
import { ShoppingCart, Loader2, CreditCard, Sparkles } from 'lucide-react';
import { useAuth } from '@/features/auth/components/AuthProvider';
import { openCheckout, saveCheckoutIntent } from '@/features/products/lib/checkout';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { isFeatureEnabled } from '@/lib/config/features';

export default function ProductActions({ 
  checkoutUrl, 
  price 
}: { 
  checkoutUrl: string | null;
  price: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Cleaner than window.location.pathname
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = async () => {
    if (!checkoutUrl) {
      console.error('No checkout URL configured');
      return;
    }
    
    setIsProcessing(true);

    // Ensure we are interacting with Lemon Squeezy or our custom lib correctly
    await openCheckout({
      priceId: checkoutUrl,
      userId: user?.id,
      userEmail: user?.email,
      onUnauthenticated: () => {
        // Save intent for post-login redirection
        saveCheckoutIntent(checkoutUrl);
        router.push(`/login?returnTo=${pathname}`);
      },
    });

    // Reset processing state
    // We use a slightly longer timeout to account for overlay animation
    const timer = setTimeout(() => setIsProcessing(false), 2500);
    return () => clearTimeout(timer);
  };

  return (
    <div className="flex flex-col gap-5 pt-4">
      <div className="flex gap-3">
        <button 
          onClick={handleBuy}
          disabled={isProcessing || !checkoutUrl}
          className="
            flex-[4] py-4 rounded-2xl font-black text-white 
            bg-kyn-green-600 hover:bg-kyn-green-500 
            shadow-xl shadow-kyn-green-600/20 
            transition-all active:scale-[0.98] disabled:opacity-70 
            flex items-center justify-center gap-3 group
          "
        >
          {isProcessing ? (
            <LoadingSpinner size={18} />
          ) : (
            <CreditCard size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          )}
          
          <span className="text-base uppercase tracking-widest">
            {isProcessing ? 'Opening...' : 'Unlock Asset'}
          </span>

          <div className="ml-2 bg-black/20 px-3 py-1 rounded-xl text-sm font-black border border-white/10 backdrop-blur-sm">
            {price}
          </div>
        </button>
        
        <button 
          disabled={!isFeatureEnabled('cart')}
          title={!isFeatureEnabled('cart') ? "Cart coming soon" : undefined}

          className="
            flex-1 px-5 rounded-2xl 
            bg-kyn-slate-50 dark:bg-kyn-slate-900/50 
            border border-kyn-slate-100 dark:border-kyn-slate-800 
            text-kyn-slate-300 dark:text-kyn-slate-700 cursor-not-allowed
            flex items-center justify-center transition-colors
          "
        >
          <ShoppingCart size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-3 py-2 rounded-2xl bg-kyn-slate-50/50 dark:bg-kyn-slate-900/30 border border-transparent hover:border-kyn-slate-100 dark:hover:border-kyn-slate-800 transition-all">
        <div className="flex -space-x-1">
          <Sparkles size={14} className="text-kyn-green-500 fill-kyn-green-500/20" />
        </div>
        <p className="text-[10px] font-black text-kyn-slate-400 uppercase tracking-[0.15em]">
          Instant Digital Delivery & Lifetime Access
        </p>
      </div>
    </div>
  );
}
