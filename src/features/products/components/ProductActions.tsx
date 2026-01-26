'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, CreditCard, Sparkles } from 'lucide-react';
// FIX: Ensure this import matches the fixed AuthProvider file
import { useAuth } from '@/features/auth/components/AuthProvider';
import { openCheckout, saveCheckoutIntent } from '@/features/products/lib/checkout';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

/**
 * ProductActions Component
 * Handles the "Unlock" logic and Feature Flagging for the Product Page.
 */
export default function ProductActions({ 
  checkoutUrl, 
  price 
}: { 
  checkoutUrl: string | null;
  price: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isProcessing, setIsProcessing] = useState(false);

  // Fallback for Feature Flagging since @/lib/config/features is currently unstable
  const isCartEnabled = false; 

  const handleBuy = async () => {
    if (!checkoutUrl || isProcessing) return;
    
    setIsProcessing(true);

    try {
      await openCheckout({
        priceId: checkoutUrl,
        userId: user?.id,
        userEmail: user?.email,
        onUnauthenticated: () => {
          saveCheckoutIntent(checkoutUrl);
          router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
        },
      });
    } catch (error) {
      console.error('Action failure:', error);
    } finally {
      // Keep loading state briefly to handle the redirect or overlay pop-up
      setTimeout(() => setIsProcessing(false), 2000);
    }
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
            <LoadingSpinner />
          ) : (
            <>
              <CreditCard size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
              <span className="text-base uppercase tracking-widest">
                Unlock Asset
              </span>
              <div className="ml-2 bg-black/20 px-3 py-1 rounded-xl text-sm font-black border border-white/10 backdrop-blur-sm">
                {price}
              </div>
            </>
          )}
        </button>
        
        <button 
          disabled={!isCartEnabled}
          className="
            flex-1 px-5 rounded-2xl 
            bg-kyn-slate-50 dark:bg-kyn-slate-900/50 
            border border-kyn-slate-100 dark:border-kyn-slate-800 
            text-kyn-slate-300 dark:text-kyn-slate-700 cursor-not-allowed
            flex items-center justify-center
          "
        >
          <ShoppingCart size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 py-2 rounded-2xl bg-kyn-slate-50/50 dark:bg-kyn-slate-900/30 border border-transparent">
        <Sparkles size={14} className="text-kyn-green-500 fill-kyn-green-500/20" />
        <p className="text-[10px] font-black text-kyn-slate-400 uppercase tracking-[0.15em]">
          Instant Digital Delivery & Lifetime Access
        </p>
      </div>
    </div>
  );
}
