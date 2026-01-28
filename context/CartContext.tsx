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

  // 1. Persistence: Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('kynar_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        // Diagnostic Fix: Prevent app crash on malformed local data
        if (process.env.NODE_ENV === 'development') {
          console.warn("Kynar: Resetting corrupted cart data.");
        }
        localStorage.removeItem('kynar_cart');
      }
    }
  }, []);

  // 2. Persistence: Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kynar_cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Logic for "Calm Confidence" (UX Guide 11.3):
   * Since we sell digital assets, we enforce a strict single-item policy per product.
   */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; 
      
      return [...prev, product];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Aggregate total for checkout and UI displays
  const totalPrice = cart.reduce((total, item) => total + (item.price_gbp || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
