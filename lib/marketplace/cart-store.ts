/**
 * KYNAR UNIVERSE: Cart & Selection Store (v1.6)
 * Role: Persistent state management for product acquisition.
 * Logic: Hydration-safe, Idempotent, Mobile-optimized.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  // Metadata for Hydration Safety
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

/**
 * useCart: The primary hook for marketplace interactions.
 * Uses localStorage to persist the "Universe Selection" between sessions.
 */
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      _hasHydrated: false,

      // Ensures the client knows when it's safe to render persisted data
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // Idempotent add: Prevents duplicates even on mobile double-taps
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
        // Signals to the UI that hydration is complete
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * HYDRATION HOOK
 * Use this in your Cart components to prevent Next.js 15 hydration errors.
 * Example: const cart = useSafeCart(); if (!cart) return <Skeleton />;
 */
export function useSafeCart() {
  const store = useCart();
  const [isClient, setIsClient] = import('react').then(m => m.useState(false));
  
  // Note: For SPCK/Build safety, we use the internal _hasHydrated check
  return store._hasHydrated ? store : null;
}
