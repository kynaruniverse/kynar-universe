/* KYNAR UNIVERSE: lib/store/vault.ts */

import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { getPriceFromId } from '@/lib/marketplace/pricing';
import { useState, useEffect } from 'react';

const mockStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

interface VaultState {
  items: Product[];
  _hasHydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearVault: () => void;
  setHasHydrated: (state: boolean) => void;
}

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
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? window.localStorage : mockStorage
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export function useVault() {
  const items = useVaultStore((state) => state.items);
  const hasHydrated = useVaultStore((state) => state._hasHydrated);
  const addItem = useVaultStore((state) => state.addItem);
  const removeItem = useVaultStore((state) => state.removeItem);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasHydrated) {
    return {
      items: [],
      count: 0,
      totalValue: 0,
      addItem: (p: Product) => {}, 
      removeItem: (id: string) => {},
      isInVault: (id: string) => false,
    };
  }

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
