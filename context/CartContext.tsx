"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Define what an "Item" looks like in the cart
type CartItem = {
  id: number;
  title: string;
  price: number;
  slug: string;
  image?: string;
};

// 2. Define what the "Brain" can do
type CartContextType = {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  totalPrice: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. The Provider (The Logic Engine)
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // A. Load from Local Storage on startup (The Memory)
  useEffect(() => {
    const savedCart = localStorage.getItem('kynar_cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // B. Save to Local Storage whenever items change
  useEffect(() => {
    localStorage.setItem('kynar_cart', JSON.stringify(items));
  }, [items]);

  // C. Add Function (Logic: Don't add duplicates)
  const addToCart = (product: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; // Already in cart
      return [...prev, product];
    });
  };

  // D. Remove Function
  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // E. Calculate Totals
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const cartCount = items.length;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, totalPrice, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Hook to use the cart anywhere
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
