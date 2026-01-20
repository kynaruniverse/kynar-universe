"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  cartItems: CartItem[]; // Alias for compatibility
  cartCount: number;
  cartTotal: number;
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
  lastAddedItem: string;
  lastAddedCategory: string;
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState("");
  const [lastAddedCategory, setLastAddedCategory] = useState("");

  const addToCart = (product: any) => {
    setLastAddedItem(product.name);
    setLastAddedCategory(product.category);
    setShowSuccess(true);
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartItems: cart, 
      cartCount, 
      cartTotal,
      showSuccess, 
      setShowSuccess, 
      lastAddedItem, 
      lastAddedCategory, 
      addToCart, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
