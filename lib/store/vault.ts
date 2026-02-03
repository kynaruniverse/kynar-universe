import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';
import { getPriceFromId } from '@/lib/marketplace/pricing';

interface VaultState {
  items: Product[];
  _hasHydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearVault: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useVault = create<VaultState>()(
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
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/**
 * SELECTORS: Keep these outside the store for better memoization
 */
export const selectVaultTotal = (state: VaultState) =>
  state.items.reduce((total, item) => total + getPriceFromId(item.price_id), 0);

export const selectIsInVault = (state: VaultState, productId: string) =>
  state.items.some((item) => item.id === productId);
