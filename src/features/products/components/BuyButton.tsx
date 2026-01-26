'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
// FIX: Explicitly check if these paths exist. 
// If Pydroid still flags them, you may need to add '.ts' or '.tsx' extensions.
import { openCheckout, saveCheckoutIntent } from '@/features/products/lib/checkout';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

// 1. Fix TypeScript window error
declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void;
      };
      Setup: () => void;
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
    // 2. Initialize Lemon Squeezy Overlay
    if (typeof window !== 'undefined') {
      if (window.createLemonSqueezy) {
        window.createLemonSqueezy();
      }
      // Ensure LemonSqueezy is set up if already loaded
      window.LemonSqueezy?.Setup?.();
    }
  }, []);
  
  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    
    try {
      // Construct the checkout URL
      const checkoutUrl = variantId.startsWith('http') 
        ? variantId 
        : `https://kynar.lemonsqueezy.com/checkout/buy/${variantId}`;

      await openCheckout({
        priceId: variantId,
        userId,
        onUnauthenticated: () => {
          // 3. Capture current path for a seamless return trip
          saveCheckoutIntent(checkoutUrl);
          const returnPath = encodeURIComponent(window.location.pathname);
          window.location.href = `/login?returnTo=${returnPath}`;
        },
        embed: true, // Uses the Lemon Squeezy overlay
      });
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      // Small delay to ensure the overlay has time to pop up on mobile
      setTimeout(() => setLoading(false), 2000);
    }
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
        <LoadingSpinner />
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
          <span className="relative">Unlock Now</span>
        </>
      )}
    </button>
  );
}
