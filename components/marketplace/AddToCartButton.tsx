"use client";

/**
 * KYNAR UNIVERSE: Add To Cart Button (v2.3.2)
 * Role: Handles adding products to the cart, vault detection, and UI states.
 */

import { useState, useEffect, type MouseEvent } from "react";
import { Plus, Check, Lock, Loader2 } from "lucide-react";
import { useCartItems, useCartActions } from "@/lib/cart/store";
import { useVault } from "@/lib/store/vault";
import { Product } from "@/lib/supabase/types";
import { cn, hapticFeedback } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  className ? : string;
}

export const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { items } = useCartItems();
  const { addItem } = useCartActions();
  const { isInVault } = useVault();
  
  // Ensure client-side logic only
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Derived states
  const isOwned = mounted && isInVault(product.id);
  const inCart = mounted && items.some((item) => item.id === product.id);
  
  // Handle Add to Cart
  const handleAdd = async (e: MouseEvent < HTMLButtonElement > ) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    hapticFeedback("light");
    
    // Simulate small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    addItem(product);
    setIsAdding(false);
    hapticFeedback("success");
  };
  
  // Placeholder skeleton for SSR / hydration
  if (!mounted) {
    return (
      <div
        className={cn(
          "h-12 w-full rounded-xl bg-surface animate-pulse",
          className
        )}
      />
    );
  }
  
  // Owned product
  if (isOwned) {
    return (
      <DisabledButton
        icon={Lock}
        label="In Vault"
        bg="bg-kyn-green-50/50"
        text="text-kyn-green-600"
        className={className}
      />
    );
  }
  
  // Already in cart
  if (inCart) {
    return (
      <DisabledButton
        icon={Check}
        label="Selected"
        bg="bg-kyn-slate-100"
        text="text-kyn-slate-900"
        className={className}
      />
    );
  }
  
  // Default: addable
  return (
    <button
      onClick={handleAdd}
      disabled={isAdding}
      className={cn(
        "group flex w-full items-center justify-center gap-2 rounded-xl bg-kyn-slate-900 py-3 font-brand text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.97] disabled:opacity-70",
        className
      )}
    >
      {isAdding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
      {isAdding ? "Syncing..." : "Select"}
    </button>
  );
};

/* ---------- Disabled Button Subcomponent ---------- */

interface DisabledButtonProps {
  icon: typeof Plus;
  label: string;
  bg: string;
  text: string;
  className ? : string;
}

function DisabledButton({ icon: Icon, label, bg, text, className }: DisabledButtonProps) {
  return (
    <button
      disabled
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl py-3 font-brand text-sm font-bold cursor-not-allowed",
        bg,
        text,
        className
      )}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}