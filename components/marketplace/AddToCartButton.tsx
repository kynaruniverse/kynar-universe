"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Fixed: Relative pathing and correct type source
import { Database } from '@/lib/supabase/types';
import { useCart } from '@/lib/cart/store';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';

// Use the explicit Row type from your Supabase schema
type Product = Database['public']['Tables']['products']['Row'];

interface AddToCartButtonProps {
  product: Product;
  variant?: 'primary' | 'ghost';
}

/**
 * KYNAR UNIVERSE: Add To Cart (Selection)
 * Aligned with UX Canon Section 1 (Reassured State)
 * Focus: Soft feedback and clear directional flow.
 */
export const AddToCartButton = ({ product, variant = 'primary' }: AddToCartButtonProps) => {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const alreadyInCart = isInCart(product.id);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (alreadyInCart) {
      router.push('/cart');
      return;
    }

    addItem(product);
    setShowToast(true);
    // Standard duration for reassurance
    setTimeout(() => setShowToast(false), 5000);
  };

  // Design System Section 6.2 - Button Styling mapped to semantic variables
  const baseStyles = "relative flex items-center justify-center gap-2 calm-transition font-brand font-bold active:scale-[0.98]";
  
  const variants = {
    primary: `${baseStyles} w-full md:w-auto md:px-12 py-4 bg-text-primary text-canvas rounded-kynar shadow-kynar-soft hover:opacity-90`,
    ghost: `${baseStyles} w-full py-3 border border-border bg-transparent text-text-secondary rounded-kynar hover:border-text-primary hover:text-text-primary`
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleAction}
        className={variants[variant]}
      >
        {alreadyInCart ? (
          <>
            <Check size={18} className="text-kyn-green-500" />
            <span>In Selection</span>
          </>
        ) : (
          <>
            <ShoppingBag size={18} className="opacity-70" />
            <span>Add to Universe</span>
          </>
        )}
      </button>

      {/* Reassured Toast - Contextual feedback synchronized with Design System */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-500">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-text-primary/95 backdrop-blur-md px-5 py-4 text-canvas shadow-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-kyn-green-500/20 text-kyn-green-400">
                <Sparkles size={16} />
              </div>
              <p className="font-ui text-sm font-medium">Added to Selection</p>
            </div>
            <Link 
              href="/cart" 
              className="font-brand text-xs font-bold uppercase tracking-widest text-kyn-green-400 hover:text-kyn-green-300 calm-transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
