/* KYNAR UNIVERSE: lib/cart/store.ts (v1.7) */
"use client";

import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/supabase/types";
import { getPriceFromId } from "@/lib/marketplace/pricing";

/* -------------------------------------------------------------------------- */
/* Storage Guard (Turbopack / SSR safe)                                        */
/* -------------------------------------------------------------------------- */

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

/* -------------------------------------------------------------------------- */
/* Store Types                                                                 */
/* -------------------------------------------------------------------------- */

interface CartState {
  items: Product[];
  hydrated: boolean;
  
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  
  isInCart: (productId: string) => boolean;
  markHydrated: () => void;
}

/* -------------------------------------------------------------------------- */
/* Store                                                                       */
/* -------------------------------------------------------------------------- */

export const useCartStore = create < CartState > ()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      
      addItem: (product) => {
        if (get().items.some((i) => i.id === product.id)) return;
        set((state) => ({ items: [...state.items, product] }));
      },
      
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      
      clearCart: () => set({ items: [] }),
      
      isInCart: (productId) =>
        get().items.some((item) => item.id === productId),
      
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "kynar-vault-session-v1.7",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage
      ),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    }
  )
);

/* -------------------------------------------------------------------------- */
/* Selectors / Hooks                                                           */
/* -------------------------------------------------------------------------- */

export function useCartItems() {
  const items = useCartStore((s) => s.items);
  const hydrated = useCartStore((s) => s.hydrated);
  const removeItem = useCartStore((s) => s.removeItem);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const totalPrice = useMemo(
    () =>
    items.reduce((sum, item) => {
      const price = getPriceFromId(item.price_id);
      return sum + (price ?? 0);
    }, 0),
    [items]
  );
  
  const ready = mounted && hydrated;
  
  return {
    items: ready ? items : [],
    count: ready ? items.length : 0,
    totalPrice: ready ? totalPrice : 0,
    isEmpty: !ready || items.length === 0,
    removeItem,
  };
}

export function useCartActions() {
  return useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    clearCart: state.clearCart,
    isInCart: state.isInCart,
  }));
}