"use client";

/**
 * KYNAR UNIVERSE: Add To Cart Button (v2.2)
 * Role: Context-aware acquisition trigger.
 * Logic: Implements Safe Mounted Pattern to prevent hydration flicker.
 */

import { useState, useEffect, type MouseEvent } from "react";
import { Plus, Check, Lock, Loader2 } from "lucide-react";
import { useCartItems, useCartActions } from "@/lib/marketplace/cart-store";
import { useVault } from "@/lib/store/vault";
import { Product } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { hapticFeedback } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Consumption of Safe Hooks
  const { items } = useCartItems();
  const { addItem } = useCartActions();
  const { isInVault } = useVault();

  // 1. Ensure component is mounted to prevent Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Logic Check: State resolution happens ONLY after mount
  const isOwned = mounted ? isInVault(product.id) : false;
  const inCart = mounted ? items.some((item) => item.id === product.id) : false;

  const handleAdd = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOwned || inCart || isAdding) return;

    setIsAdding(true);
    hapticFeedback("light");
    
    // Artificial delay for visual feedback/UX grounding
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    addItem(product);
    setIsAdding(false);
    hapticFeedback("success");
  };

  // SSR Placeholder: Matches initial server render to prevent layout shift
  if (!mounted) {
    return (
      <div className={cn("h-12 w-full rounded-xl bg-surface animate-pulse", className)} />
    );
  }

  // State: Already Owned
  if (isOwned) {
    return (
      <button
        disabled
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl bg-kyn-green-50/50 py-3 font-brand text-sm font-bold text-kyn-green-600 transition-all",
          className
        )}
      >
        <Lock size={16} />
        In Vault
      </button>
    );
  }

  // State: Already in Selection/Cart
  if (inCart) {
    return (
      <button
        disabled
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl bg-kyn-slate-100 py-3 font-brand text-sm font-bold text-kyn-slate-900 transition-all",
          className
        )}
      >
        <Check size={16} />
        Selected
      </button>
    );
  }

  // State: Standard Actionable
  return (
    <button
      onClick={handleAdd}
      disabled={isAdding}
      className={cn(
        "group flex w-full items-center justify-center gap-2 rounded-xl bg-kyn-slate-900 py-3 font-brand text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.97] disabled:opacity-70",
        className
      )}
    >
      {isAdding ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <>
          <Plus size={16} className="transition-transform group-hover:rotate-90" />
          Add to Cart
        </>
      )}
    </button>
  );
};
