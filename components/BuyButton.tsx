'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';

interface BuyButtonProps {
  variantId: string;
  userId?: string;
  className?: string;
}

export default function BuyButton({ variantId, userId, className }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize Lemon Squeezy if it's not already
    if (window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!userId) {
      // Redirect to login if they aren't signed in
      window.location.href = '/login?callbackUrl=' + window.location.pathname;
      return;
    }

    setLoading(true);

    // This is the CRITICAL part for your webhook
    // It appends the user_id so LS sends it back to your API
    const checkoutUrl = `https://kynar.lemonsqueezy.com/checkout/buy/${variantId}?checkout[custom][user_id]=${userId}&embed=1`;

    // Open Lemon Squeezy Overlay
    if (window.LemonSqueezy) {
      window.LemonSqueezy.Url.Open(checkoutUrl);
      setLoading(false);
    } else {
      // Fallback if script hasn't loaded
      window.location.href = checkoutUrl;
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
        transition-all active:scale-95 disabled:opacity-70
        shadow-xl shadow-kyn-green-600/20
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <ShoppingBag className="w-5 h-5" />
      )}
      <span>{loading ? 'Opening...' : 'Unlock Now'}</span>
    </button>
  );
}
