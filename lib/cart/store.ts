/**
 * KYNAR UNIVERSE: The Vault Store (v1.6)
 * Role: Persistent state management for the digital selection.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { getPriceFromId } from '../marketplace/pricing';
import { useState, useEffect } from 'react';

interface CartState {
  items: Product[];
  isHydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  setHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      addItem: (product: Product) => {
        const { items } = get();
        if (!items.some((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },
      clearCart: () => set({ items: [] }),
      isInCart: (productId: string) => get().items.some((item) => item.id === productId),
      setHydrated: (state: boolean) => set({ isHydrated: state }),
    }),
    {
      name: 'kynar-vault-session-v1.6',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? window.localStorage : (null as any)),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);

/**
 * CUSTOM HOOK: useCartItems
 * This is what the SelectionOverlay and PresenceBar use.
 * It handles the math and the "mounted" check to prevent Hydration errors.
 */
export function useCartItems() {
  const { items, isHydrated, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = items.reduce((total, item) => {
    const price = getPriceFromId(item.price_id);
    return total + (price ?? 0);
  }, 0);

  // While loading or on server, return empty to prevent mismatch
  if (!mounted || !isHydrated) {
    return { items: [], count: 0, totalPrice: 0, isEmpty: true, removeItem, updateQuantity: () => {} };
  }

  return { 
    items, 
    count: items.length, 
    totalPrice, 
    isEmpty: items.length === 0, 
    removeItem,
    // Since Kynar is "Single-Unit Ownership", updateQuantity is a dummy function
    updateQuantity: () => {} 
  };
}
