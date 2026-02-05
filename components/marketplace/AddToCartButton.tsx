"use client";

/**
 * KYNAR UNIVERSE: Add To Cart Button (v2.3.2)
 * Fix: Explicitly mapped to lib/supabase/types.ts per user file structure.
 */

import { useState, useEffect, type MouseEvent } from "react";
import { Plus, Check, Lock, Loader2 } from "lucide-react";
import { useCartItems, useCartActions } from "@/lib/cart/store";
import { useVault } from "@/lib/store/vault";
import { Product } from "@/lib/supabase/types"; // Path verified
import { cn, hapticFeedback } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { items } = useCartItems();
  const { addItem } = useCartActions();
  const { isInVault } = useVault();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isOwned = mounted ? isInVault(product.id) : false;
  const inCart = mounted ? items.some((item) => item.id === product.id) : false;
  
  const handleAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    setIsAdding(true);
    hapticFeedback("light");
    
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    addItem(product);
    
    setIsAdding(false);
    hapticFeedback("success");
  };
  
  if (!mounted) return <div className={cn("h-12 w-full rounded-xl bg-surface animate-pulse", className)} />;
  
  if (isOwned) {
    return (
      <button 
        disabled 
        className={cn("flex w-full items-center justify-center gap-2 rounded-xl bg-kyn-green-50/50 py-3 font-brand text-sm font-bold text-kyn-green-600 cursor-not-allowed", className)}
      >
        <Lock size={16} /> In Vault
      </button>
    );
  }
  
  if (inCart) {
    return (
      <button 
        disabled 
        className={cn("flex w-full items-center justify-center gap-2 rounded-xl bg-kyn-slate-100 py-3 font-brand text-sm font-bold text-kyn-slate-900 cursor-not-allowed", className)}
      >
        <Check size={16} /> Selected
      </button>
    );
  }
  
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
