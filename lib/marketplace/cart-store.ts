import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/supabase/types';

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  // Note: We are keeping logic in the component, 
  // but adding this here to satisfy the TS interface if needed.
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => 
        set((state) => ({
          items: state.items.some(i => i.id === product.id) 
            ? state.items 
            : [...state.items, product]
        })),
      removeItem: (productId) => 
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId)
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'kynar-cart-storage' }
  )
);
