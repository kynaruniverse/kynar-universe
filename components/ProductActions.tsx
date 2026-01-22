'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

// Helper to determine if the price is an ID or a full URL
function getCheckoutUrl(priceId: string | null) {
  if (!priceId) return '';
  // If it starts with http, assume it's a full URL (Legacy support)
  if (priceId.startsWith('http')) return priceId;
  // Otherwise, assume it's a Variant ID and build the URL
  return `https://store.lemonsqueezy.com/checkout/buy/${priceId}`;
}

export default function ProductActions({ checkoutUrl, price }: { checkoutUrl: string | null, price: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const setupDone = useRef(false);

  // Determine the actual URL to open
  const targetUrl = getCheckoutUrl(checkoutUrl);

  useEffect(() => {
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
          setupDone.current = true;
        } catch (error) {
          console.error("Setup failed:", error);
        }
      }
    };

    initLemonSqueezy();

    const intervalId = setInterval(() => {
      if (setupDone.current) {
        clearInterval(intervalId);
      } else {
        initLemonSqueezy();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [router]);

  const handleBuy = () => {
    if (!targetUrl) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    const separator = targetUrl.includes('?') ? '&' : '?';
    const finalUrl = `${targetUrl}${separator}checkout[custom][user_id]=${user.id}`;
    
    // @ts-ignore
    if (window.LemonSqueezy?.Url?.Open) {
      // @ts-ignore
      window.LemonSqueezy.Url.Open(finalUrl); 
    } else {
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
      
      {/* Visual-only Cart button for V1 */}
      <button disabled className="px-4 py-3.5 rounded-xl font-semibold text-kyn-slate-400 border border-kyn-slate-200 cursor-not-allowed">
        Add to Cart
      </button>
    </div>
  );
}
