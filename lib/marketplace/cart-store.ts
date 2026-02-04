/**
 * KYNAR UNIVERSE: Cart & Selection Store (v2.2)
 * Role: Persistent state management for product acquisition.
 * Location: lib/marketplace/cart-store.ts
 * Fix: Implemented Safe Mounted Pattern to prevent Next.js 16 hydration errors.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { useState, useEffect } from 'react';

interface CartState {
  items: Product[];
  _hasHydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setHasHydrated: (state: boolean) => void;
}

/**
 * CORE STORE: Internal Zustand store with persistence.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (product) => {
        const { items } = get();
        // Canonical ID check to prevent duplicates
        if (items.some((item) => item.id === product.id)) return;
        set({ items: [...items, product] });
      },

      removeItem: (productId) => 
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'kynar-cart-storage',
      storage: createJSONStorage(() =>    typeof window !== 'undefined' ? window.localStorage : (null as any) ),,
      onRehydrateStorage: () => (state) => {
        // Trigger hydration flag once storage is loaded into memory
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * SAFE HOOK: useCartItems()
 * Primary hook for UI consumption. Prevents hydration mismatches.
 */
export function useCartItems() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return empty state during SSR or until rehydration is complete
  if (!mounted || !hasHydrated) {
    return {
      items: [],
      count: 0,
      isEmpty: true,
    };
  }

  return {
    items,
    count: items.length,
    isEmpty: items.length === 0,
  };
}

/**
 * ACTIONS HOOK: useCartActions()
 * Separates logic from state to prevent unnecessary re-renders.
 */
export function useCartActions() {
  return {
    addItem: useCartStore((state) => state.addItem),
    removeItem: useCartStore((state) => state.removeItem),
    clearCart: useCartStore((state) => state.clearCart),
  };
}
