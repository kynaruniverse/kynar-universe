'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

interface ProductActionsProps {
  checkoutUrl: string | null;
  price: string; // Display price (e.g. "£5.00")
}

export default function ProductActions({ checkoutUrl, price }: ProductActionsProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleBuy = () => {
    if (!checkoutUrl) return;

    if (!user) {
      // 1. If not logged in, go to login
      router.push('/login');
      return;
    }

    // 2. If logged in, construct checkout URL with User ID
    // We append ?checkout[custom][user_id]=... to pass data to the webhook
    const separator = checkoutUrl.includes('?') ? '&' : '?';
    const finalUrl = `${checkoutUrl}${separator}checkout[custom][user_id]=${user.id}`;
    
    // 3. Go to Lemon Squeezy
    window.location.href = finalUrl;
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
