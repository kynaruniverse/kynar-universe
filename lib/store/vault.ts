/* KYNAR UNIVERSE: Vault Store & Hook (v2.0) */
"use client";

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { getPriceFromId } from '@/lib/marketplace/pricing';
import { useState, useEffect } from 'react';

// Fallback storage for SSR / Turbopack
const mockStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

interface VaultState {
  items: Product[];
  _hasHydrated: boolean;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearVault: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useVaultStore = create < VaultState > ()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,
      
      // Mark store as hydrated
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      
      // Add product if not already present
      addItem: (product) => {
        const { items } = get();
        if (!items.some((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      
      // Remove product by ID
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
      
      // Clear all products
      clearVault: () => set({ items: [] }),
    }),
    {
      name: 'kynar-vault-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : mockStorage
      ),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);

/**
 * Custom hook: Vault access with hydration and mounting safety
 */
export function useVault() {
  const items = useVaultStore((state) => state.items);
  const hasHydrated = useVaultStore((state) => state._hasHydrated);
  const addItem = useVaultStore((state) => state.addItem);
  const removeItem = useVaultStore((state) => state.removeItem);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Return safe defaults until hydrated and mounted
  if (!mounted || !hasHydrated) {
    return {
      items: [] as Product[],
      count: 0,
      totalValue: 0,
      addItem: (_product: Product) => {},
      removeItem: (_id: string) => {},
      isInVault: (_id: string) => false,
    };
  }
  
  const totalValue = items.reduce((sum, item) => sum + (getPriceFromId(item.price_id) ?? 0), 0);
  
  return {
    items,
    count: items.length,
    totalValue,
    addItem,
    removeItem,
    isInVault: (id: string) => items.some((item) => item.id === id),
  };
}