'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { openCheckout, saveCheckoutIntent } from '@/lib/checkout';

// 1. Fix TypeScript window error
declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void;
      };
    };
  }
}

interface BuyButtonProps {
  variantId: string;
  userId?: string;
  className?: string;
}

export default function BuyButton({ variantId, userId, className }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // 2. Initialize Lemon Squeezy
    if (typeof window !== 'undefined' && window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);
  
  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Construct the checkout URL
    const checkoutUrl = variantId.startsWith('http') 
      ? variantId 
      : `https://store.lemonsqueezy.com/checkout/buy/${variantId}`;

    await openCheckout({
      priceId: variantId,
      userId,
      onUnauthenticated: () => {
        // 3. Capture current path for a seamless return trip
        saveCheckoutIntent(checkoutUrl);
        const returnPath = encodeURIComponent(window.location.pathname);
        window.location.href = `/login?returnTo=${returnPath}`;
      },
      embed: true,
    });
    
    // Reset loading state. 
    // If the overlay opens, the user is focused there.
    // If it fails, this ensures the button isn't stuck.
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  };
  
  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`
        relative inline-flex items-center justify-center gap-3
        bg-kyn-green-600 hover:bg-kyn-green-500 text-white
        px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest
        transition-all active:scale-[0.98] active:brightness-90
        disabled:opacity-70 disabled:cursor-not-allowed
        shadow-xl shadow-kyn-green-600/20
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={3} />
      ) : (
        <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
      )}
      
      <span className="relative">
        {loading ? 'Processing...' : 'Unlock Now'}
      </span>
    </button>
  );
}
