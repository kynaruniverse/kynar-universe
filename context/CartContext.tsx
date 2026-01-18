"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// ALIGNED: Muse Engine Standard Item Structure
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

  // 1. INITIALIZE FROM PERSISTENT STORAGE
  useEffect(() => {
    // Muse Engine Key: Transitioned from kynar_cart to muse_manifest
    const savedCart = localStorage.getItem('kynar_muse_manifest');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        localStorage.removeItem('kynar_muse_manifest');
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. MANIFEST PERSISTENCE
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('kynar_muse_manifest', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      
      // MUSE LOGIC: Digital assets are unique; quantity is locked to 1
      if (exists) return prev; 
      
      return [...prev, { ...product, quantity: 1 }];
    });

    setLastAddedItem(product.title);
    
    // Intelligence on Demand: Reset state before triggering the reveal
    setShowSuccess(false); 
    // Small liquid delay to allow the physical layers to settle
    setTimeout(() => setShowSuccess(true), 150);
  };

  const updateQuantity = (id: string, quantity: number) => {
    // Enforcing the "Single Asset" rule for the Muse Engine
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 1 } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('kynar_muse_manifest');
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
