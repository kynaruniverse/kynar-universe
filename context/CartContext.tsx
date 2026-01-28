"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/index';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  // 1. Load cart from LocalStorage on mount (Persistence)
  useEffect(() => {
    const savedCart = localStorage.getItem('kynar_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // 2. Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kynar_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Logic for "Calm Confidence" (UX Guide 11.3)
  const addToCart = (product: Product) => {
    setCart((prev) => {
      // Prevent duplicates: Only add if the item isn't already there
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; 
      
      return [...prev, product];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Calculate total for the MiniCart
  const totalPrice = cart.reduce((total, item) => total + item.price_gbp, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
