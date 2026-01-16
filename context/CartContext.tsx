"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  slug: string;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void; // <--- NEW CAPABILITY
  totalPrice: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from storage
  useEffect(() => {
    const savedCart = localStorage.getItem('kynar_cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to storage
  useEffect(() => {
    localStorage.setItem('kynar_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // NEW: WIPE THE SLATE CLEAN
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('kynar_cart');
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
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
