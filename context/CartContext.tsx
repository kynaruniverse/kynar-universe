"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  slug: string;
  image?: string;
  category?: string; // Added category so we can use it for visual logic later if needed
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // <--- THE SAFETY FLAG

  // 1. Load from storage (Only runs once on mount)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('kynar_cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart", error);
        }
      }
      setIsInitialized(true); // <--- Now we are ready to save
    }
  }, []);

  // 2. Save to storage (Only runs if initialized)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('kynar_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (product: CartItem) => {
    setItems((prev) => {
      // Prevent duplicates based on ID
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kynar_cart');
    }
  };

  // Calculate total safely
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const cartCount = items.length;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
