/**
 * KYNAR UNIVERSE: Cart Store (v1.5 - Hydration Hardened)
 * - Persists to LocalStorage via Zustand
 * - Logic: Single-unit ownership (No quantities > 1)
 * - Flow: Cart -> Lemon Squeezy Checkout
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// Fixed: Relative pathing for reliable root-level resolution on Netlify
import { Database } from '../supabase/types';
import { getPriceFromId } from '../marketplace/pricing';

type Product = Database['public']['Tables']['products']['Row'];

interface CartState {
  items: Product[];
  isHydrated: boolean; // Calm UX: Track hydration to prevent UI flicker
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getTotalPrice: () => number;
  setHydrated: (state: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      
      addItem: (product: Product) => {
        const currentItems = get().items;
        const exists = currentItems.find((item) => item.id === product.id);
        
        // UX Canon: Prevent duplicates. Digital products are owned, not accumulated.
        if (!exists) {
          set({ items: [...currentItems, product] });
        }
      },

      removeItem: (productId: string) => {
        set({ 
          items: get().items.filter((item) => item.id !== productId) 
        });
      },

      clearCart: () => set({ items: [] }),

      isInCart: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = getPriceFromId(item.price_id);
          return total + (price ?? 0);
        }, 0);
      },

      setHydrated: (state: boolean) => set({ isHydrated: state }),
    }),
    {
      name: 'kynar-vault-session-v1.5',
      // Fixed: Wrapped in a check to prevent "window is not defined" during Netlify build
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? window.localStorage : ({} as Storage))),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
