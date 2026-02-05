/**
 * KYNAR UNIVERSE: Secure Vault Store (v2.2.2)
 * Role: Persistent library management for acquired products.
 * Fix: Implemented Mock Storage for SSR to resolve StateStorage type error.
 */

import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
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

export const useVaultStore = create < VaultState > ()(
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
      storage: createJSONStorage(() => {
        // Resolve: Return mock storage if window is undefined to satisfy StateStorage interface
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        
        return {
          getItem: (name: string) => null,
          setItem: (name: string, value: string) => {},
          removeItem: (name: string) => {},
        }
        as StateStorage;
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * SAFE HOOK: useVault()
 * High-performance selector-based hook with hydration safety.
 */
export function useVault() {
  const items = useVaultStore((state) => state.items);
  const hasHydrated = useVaultStore((state) => state._hasHydrated);
  const addItem = useVaultStore((state) => state.addItem);
  const removeItem = useVaultStore((state) => state.removeItem);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return empty/initial state during SSR to prevent Hydration Mismatch
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
  
  // Resolved: Secured getPriceFromId return value with nullish coalescing
  const totalValue = items.reduce((total, item) => {
    const price = getPriceFromId(item.price_id);
    return total + (price ?? 0);
  }, 0);
  
  return {
    items,
    count: items.length,
    totalValue,
    addItem,
    removeItem,
    isInVault: (id: string) => items.some((item) => item.id === id),
  };
}