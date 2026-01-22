'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function ProductActions({ checkoutUrl, price }: { checkoutUrl: string | null, price: string }) {
  const { user } = useAuth();
  const router = useRouter();

  // 1. Listen for the "Payment Success" signal
  useEffect(() => {
    // @ts-ignore - LemonSqueezy is added by the script in layout.tsx
    if (typeof window !== 'undefined' && window.createLemonSqueezy) {
      // @ts-ignore
      window.LemonSqueezy.Setup({
        eventHandler: (event: { event: string }) => {
          // If payment works, instantly go to account page
          if (event.event === 'Payment.Success') {
            router.push('/account');
            router.refresh();
          }
        },
      });
    }
  }, [router]);

  const handleBuy = () => {
    if (!checkoutUrl) return;
    if (!user) {
      router.push('/login');
      return;
    }

    // 2. Add user_id to the URL so we know who bought it
    const separator = checkoutUrl.includes('?') ? '&' : '?';
    const finalUrl = `${checkoutUrl}${separator}checkout[custom][user_id]=${user.id}`;
    
    // 3. Open the Overlay Popup
    // @ts-ignore
    if (window.LemonSqueezy) {
      // @ts-ignore
      window.LemonSqueezy.Url.Open(finalUrl);
    } else {
      // Fallback: If script fails, just go to the link like before
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
