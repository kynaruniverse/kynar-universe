/**
 * KYNAR UNIVERSE: Secure Vault Store (v2.2)
 * Role: Persistent library management for acquired products.
 * Location: lib/store/vault.ts
 * Fix: Added Safe Hook wrapper to prevent Next.js 16 hydration mismatches.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { getPriceFromId } from '@/lib/marketplace/pricing';
import { useState, useEffect } from 'react';

interface VaultState {
  items: Product[];
  _hasHydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearVault: () => void;
  setHasHydrated: (state: boolean) => void;
}

// Internal store
export const useVaultStore = create<VaultState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (product) => {
        const { items } = get();
        if (items.some((item) => item.id === product.id)) return;
        set({ items: [...items, product] });
      },

      removeItem: (productId) => 
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        })),

      clearVault: () => set({ items: [] }),
    }),
    {
      name: 'kynar-vault-storage',
      storage: createJSONStorage(() =>    typeof window !== 'undefined' ? window.localStorage : (null as any) ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * SAFE HOOK: useVault()
 * Use this in your components to safely access the vault.
 * It ensures data only appears after the client-side mount.
 */
export function useVault() {
  const items = useVaultStore((state) => state.items);
  const hasHydrated = useVaultStore((state) => state._hasHydrated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return empty/initial state during SSR to keep Next.js happy
  if (!mounted || !hasHydrated) {
    return {
      items: [],
      count: 0,
      totalValue: 0,
      addItem: (_p: Product) => {}, 
      removeItem: (_id: string) => {},
      isInVault: (_id: string) => false,
    };
  }

  return {
    items,
    count: items.length,
    totalValue: items.reduce((total, item) => total + getPriceFromId(item.price_id), 0),
    addItem: useVaultStore.getState().addItem,
    removeItem: useVaultStore.getState().removeItem,
    isInVault: (id: string) => items.some((item) => item.id === id),
  };
}
