'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function ProductActions({ checkoutUrl, price }: { checkoutUrl: string | null, price: string }) {
  const { user } = useAuth();
  const router = useRouter();
  // Use a ref to make sure we don't set up the listener twice
  const setupDone = useRef(false);

  useEffect(() => {
    // 1. Define the setup function safely
    const initLemonSqueezy = () => {
      // @ts-ignore
      if (window.LemonSqueezy && !setupDone.current) {
        try {
          // @ts-ignore
          window.LemonSqueezy.Setup({
            eventHandler: (event: { event: string }) => {
              if (event.event === 'Payment.Success') {
                router.push('/account');
                router.refresh();
              }
            },
          });
          setupDone.current = true; // Mark as done so we stop checking
        } catch (error) {
          console.error("Setup failed:", error);
        }
      }
    };

    // 2. Try immediately in case it's already loaded
    initLemonSqueezy();

    // 3. If not loaded, check every 500ms until it is
    const intervalId = setInterval(() => {
      if (setupDone.current) {
        clearInterval(intervalId); // Stop checking once loaded
      } else {
        initLemonSqueezy();
      }
    }, 500);

    // Cleanup: Clear the timer if the user leaves the page
    return () => clearInterval(intervalId);
  }, [router]);

  const handleBuy = () => {
    if (!checkoutUrl) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    const separator = checkoutUrl.includes('?') ? '&' : '?';
    const finalUrl = `${checkoutUrl}${separator}checkout[custom][user_id]=${user.id}`;
    
    // @ts-ignore
    if (window.LemonSqueezy?.Url?.Open) {
      // @ts-ignore
      window.LemonSqueezy.Url.Open(finalUrl);
    } else {
      // Fallback if script is still loading
      window.location.href = finalUrl;
    }
  };

  return (
    <div className="flex gap-3 pt-2">
      <button 
        onClick={handleBuy}
        className="flex-1 py-3.5 rounded-xl font-bold text-white bg-kyn-green-600 hover:bg-kyn-green-700 shadow-sm transition-colors flex items-center justify-center gap-2"
      >
        <span>Buy Now</span>
        <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{price}</span>
      </button>
      
      <button className="px-4 py-3.5 rounded-xl font-semibold text-kyn-slate-700 dark:text-kyn-slate-200 border border-kyn-slate-200 dark:border-kyn-slate-700 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-800">
        Add to Cart
      </button>
    </div>
  );
}
