/**
 * KYNAR UNIVERSE: The Acquisition Trigger (v1.6)
 * Role: Transitioning discovery into the "Selection" state.
 * Philosophy: Tactile, celebratory, and persistent.
 */

"use client";

import { useState, useEffect, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ShoppingBag, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/marketplace/cart-store';
import { triggerCelebration } from '@/lib/utils/confetti'; // Resolved Build Error
import { Product } from '@/lib/supabase/types';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'primary' | 'ghost';
  className?: string;
}

export const AddToCartButton = ({ 
  product, 
  variant = 'primary',
  className 
}: AddToCartButtonProps) => {
  const router = useRouter();
  
  // Connect to our hydration-safe store
  const { addItem, items, _hasHydrated } = useCart();
  
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount check for local animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if item is already selected, safe for SSR
  const alreadyInCart = _hasHydrated && items.some(i => i.id === product.id);

  const handleAction = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Critical: Prevents parent card Link from firing
    
    // If already in selection, redirect to view the collection
    if (alreadyInCart) {
      router.push('/cart');
      return;
    }

    setIsAdding(true);

    // 1. Artificial "Calm" Delay: Synchronizes the physical feel of the UI
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    addItem(product);
    
    // 2. Micro-Celebration: High-performance async trigger
    // Awaiting this is optional, but it ensures the logic sequence is noble.
    await triggerCelebration({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.85, x: 0.5 }, // Fires from the mobile thumb-zone
    });

    setIsAdding(false);
    setShowToast(true);
    
    // Auto-dismiss after user has had time to read
    setTimeout(() => setShowToast(false), 4500);
  };

  const variants = {
    primary: "bg-kyn-slate-900 text-white hover:bg-black shadow-xl shadow-kyn-slate-900/10",
    ghost: "bg-surface border border-kyn-slate-100 text-kyn-slate-900 hover:border-kyn-slate-300 hover:bg-kyn-slate-50/50"
  };

  // Skeleton state: Maintains layout integrity during hydration
  if (!mounted || !_hasHydrated) {
    return (
      <div className={cn(
        "h-[52px] w-full animate-pulse rounded-2xl bg-kyn-slate-50 border border-kyn-slate-100",
        className
      )} />
    );
  }

  return (
    <>
      <button
        type="button"
        disabled={isAdding}
        onClick={handleAction}
        className={cn(
          "relative flex w-full items-center justify-center gap-3 py-4 px-6 rounded-2xl font-brand text-sm font-bold transition-all active:scale-[0.96] disabled:opacity-80 overflow-hidden select-none",
          variants[variant],
          className
        )}
      >
        {isAdding ? (
          <Loader2 className="animate-spin text-kyn-green-500" size={18} />
        ) : alreadyInCart ? (
          <div className="flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-300">
            <Check size={18} className="text-kyn-green-500" />
            <span>In Selection</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="opacity-50" />
            <span>Add to Universe</span>
          </div>
        )}
      </button>

      {/* Reassured Notification: Ergonomically positioned above mobile navigation */}
      {showToast && (
        <div 
          className="fixed bottom-28 left-4 right-4 z-[100] md:left-auto md:right-8 md:bottom-8 md:w-full md:max-w-sm animate-in fade-in slide-in-from-bottom-6 duration-700 ease-kyn-out"
          role="status"
        >
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-kyn-slate-900/95 backdrop-blur-xl p-4 text-white shadow-2xl border border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-kyn-green-500/20 text-kyn-green-400">
                <Sparkles size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="font-brand text-[10px] font-black uppercase tracking-[0.2em] text-white">Registry Updated</p>
                <p className="font-ui text-xs text-kyn-slate-300 mt-0.5 truncate pr-2">
                  {product.title}
                </p>
              </div>
            </div>
            
            <Link 
              href="/cart"
              className="flex items-center gap-1.5 pl-5 py-2 border-l border-white/10 font-brand text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-kyn-green-400 transition-colors shrink-0"
            >
              Review
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
