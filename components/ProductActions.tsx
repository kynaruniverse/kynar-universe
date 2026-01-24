'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Loader2, CreditCard, Sparkles } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

// extend window to include Lemon Squeezy types
declare global {
  interface Window {
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void;
      };
      Setup: (options: { eventHandler: (event: unknown) => void }) => void;
    };
  }
}

function getCheckoutUrl(priceId: string | null) {
  if (!priceId) return '';
  if (priceId.startsWith('http')) return priceId;
  return `https://store.lemonsqueezy.com/checkout/buy/${priceId}`;
}

export default function ProductActions({ 
  checkoutUrl, 
  price 
}: { 
  checkoutUrl: string | null;
  price: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = () => {
    const targetBaseUrl = getCheckoutUrl(checkoutUrl);

    if (!targetBaseUrl) {
      console.error('No checkout URL configured');
      return;
    }
    
    setIsProcessing(true);

    // 1. Handle Unauthenticated User
    if (!user) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kynar_checkout_redirect', targetBaseUrl);
      }
      // Use a template literal to pass the current path for a smooth redirect back
      router.push(`/login?returnTo=${window.location.pathname}`);
      return;
    }

    try {
      // 2. Construct URL with User Data
      const urlObj = new URL(targetBaseUrl);
      urlObj.searchParams.set('checkout[custom][user_id]', user.id);
      urlObj.searchParams.set('checkout[email]', user.email || '');
      
      const finalUrl = urlObj.toString();

      // 3. Trigger Checkout (Overlay vs Redirect)
      if (window.LemonSqueezy?.Url?.Open) {
        window.LemonSqueezy.Url.Open(finalUrl);
        // Reset loading state after a delay for the overlay
        setTimeout(() => setIsProcessing(false), 2000);
      } else {
        window.location.href = finalUrl;
      }
    } catch (e) {
      console.error('Invalid Checkout URL:', e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex gap-3">
        <button 
          onClick={handleBuy}
          disabled={isProcessing || !checkoutUrl}
          className="
            flex-1 py-4 rounded-2xl font-bold text-white 
            bg-kyn-green-600 hover:bg-kyn-green-500 
            shadow-xl shadow-kyn-green-600/20 
            transition-all active:scale-[0.96] disabled:opacity-70 
            flex items-center justify-center gap-3
          "
        >
          {isProcessing ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <CreditCard size={20} />
          )}
          <span className="text-lg">Buy Now</span>
          <span className="bg-black/10 px-3 py-1 rounded-lg text-sm font-black border border-white/10">
            {price}
          </span>
        </button>
        
        <button 
          disabled 
          className="
            px-5 rounded-2xl 
            bg-surface border border-kyn-slate-200 dark:border-kyn-slate-800 
            text-kyn-slate-300 dark:text-kyn-slate-600 cursor-not-allowed
            flex items-center justify-center
          "
        >
          <ShoppingCart size={22} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest">
        <Sparkles size={12} className="text-kyn-caramel-500" />
        Instant Digital Delivery
      </div>
    </div>
  );
}
