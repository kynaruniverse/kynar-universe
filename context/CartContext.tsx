"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// ALIGNED: id changed to string to match Supabase UUIDs
type CartItem = {
  id: string; 
  title: string;
  price: number;
  slug: string;
  image?: string;
  category?: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
  lastAddedItem: string;
  isInitialized: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState("");

  // 1. INITIALIZE FROM LOCAL STORAGE (Mobile Safe)
  useEffect(() => {
    const savedCart = localStorage.getItem('kynar_cart_v1');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        localStorage.removeItem('kynar_cart_v1');
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. PERSIST CHANGES
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('kynar_cart_v1', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      
      // KINETIC LOGIC: For digital goods, we cap quantity at 1
      if (exists) return prev; 
      
      return [...prev, { ...product, quantity: 1 }];
    });

    setLastAddedItem(product.title);
    setShowSuccess(false); 
    setTimeout(() => setShowSuccess(true), 10);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 1 } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('kynar_cart_v1');
  };

  const cartTotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.price, 0), 
  [cartItems]);

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      cartTotal, 
      cartCount,
      showSuccess,
      setShowSuccess,
      lastAddedItem,
      isInitialized
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within CartProvider');
  return context;
}
