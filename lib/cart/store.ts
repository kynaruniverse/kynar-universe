/**
 * KYNAR UNIVERSE: The Vault Store (v1.6.1)
 * Role: Persistent state management for the digital selection.
 * Fix: Added missing useCartActions export to satisfy Marketplace components.
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
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? window.localStorage : undefined
      ),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);

/**
 * CUSTOM HOOK: useCartItems
 * Used by SelectionOverlay and PresenceBar.
 * Prevents Hydration Mismatch by delaying return until mounted.
 */
export function useCartItems() {
  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const removeItem = useCartStore((state) => state.removeItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = items.reduce((total, item) => {
    const price = getPriceFromId(item.price_id);
    return total + (price ?? 0);
  }, 0);

  if (!mounted || !isHydrated) {
    return { 
      items: [], 
      count: 0, 
      totalPrice: 0, 
      isEmpty: true, 
      removeItem, 
      updateQuantity: () => {} 
    };
  }

  return { 
    items, 
    count: items.length, 
    totalPrice, 
    isEmpty: items.length === 0, 
    removeItem,
    updateQuantity: () => {} 
  };
}

/**
 * CUSTOM HOOK: useCartActions
 * FIX: Added to resolve Netlify/Turbopack "Module not found" for named export.
 * Provides stable references to mutation methods.
 */
export function useCartActions() {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const isInCart = useCartStore((state) => state.isInCart);

  return {
    addItem,
    removeItem,
    clearCart,
    isInCart
  };
}
