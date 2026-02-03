/**
 * KYNAR UNIVERSE: The Vault Store (v1.5)
 * Role: Persistent state management for the digital selection.
 * Logic: "Single-Unit Ownership" - Digital assets are binary (Owned/Not Owned).
 * Optimization: Middleware-integrated hydration and SSR-safe persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { getPriceFromId } from '../marketplace/pricing';

interface CartState {
  items: Product[];
  isHydrated: boolean;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  
  // Selectors
  isInCart: (productId: string) => boolean;
  getTotalPrice: () => number;
  
  // Internals
  setHydrated: (state: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      /**
       * ADD ITEM
       * Logic: Only adds if the item doesn't exist. 
       * In the Kynar Universe, you don't buy two of the same digital tool.
       */
      addItem: (product: Product) => {
        const { items } = get();
        const exists = items.some((item) => item.id === product.id);

        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      /**
       * REMOVE ITEM
       * Optimized for rapid mobile interaction.
       */
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },

      /**
       * CLEAR VAULT
       * Used after successful checkout or manual reset.
       */
      clearCart: () => set({ items: [] }),

      /**
       * SELECTOR: IS IN CART
       * Essential for button state toggling.
       */
      isInCart: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },

      /**
       * SELECTOR: TOTAL CALCULATION
       * Derived from the pricing logic utility.
       */
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = getPriceFromId(item.price_id);
          return total + (price ?? 0);
        }, 0);
      },

      /**
       * INTERNAL: HYDRATION TOGGLE
       */
      setHydrated: (state: boolean) => set({ isHydrated: state }),
    }),
    {
      name: 'kynar-vault-session-v1.5',
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? window.localStorage : (null as any)
      ),
      /**
       * CRITICAL: Hydration Guard
       * This flips the bit immediately after the store is rehydrated from localStorage.
       * Prevents UI components from rendering stale/empty server state.
       */
      onRehydrateStorage: (_state) => {
        return (rehydratedState, error) => {
          if (error) {
            console.error('Kynar Vault Hydration Error:', error);
          } else if (rehydratedState) {
            rehydratedState.setHydrated(true);
          }
        };
      },
    }
  )
);
