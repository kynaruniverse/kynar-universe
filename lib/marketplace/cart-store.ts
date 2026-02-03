/**
 * KYNAR UNIVERSE: Cart & Selection Store (v1.7)
 * Role: Persistent state management for product acquisition.
 * Fix: Removed invalid dynamic import logic; implemented standard mounting check.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { useState, useEffect } from 'react';

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  // Metadata for Hydration Safety
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (product) => 
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) return state;
          return { items: [...state.items, product] };
        }),

      removeItem: (productId) => 
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        })),

      clearCart: () => set({ items: [] }),
    }),
    { 
      name: 'kynar-universe-vault-session',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * HYDRATION HOOK
 * Resolves TS2488 by using standard React hooks.
 * Ensures the UI only renders cart data once the client is mounted.
 */
export function useSafeCart() {
  const store = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null on server, and wait for Zustand hydration on client
  if (!mounted || !store._hasHydrated) return null;
  
  return store;
}
