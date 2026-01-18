"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// Standardized Product Structure
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

  // 1. INITIALIZE FROM LOCAL STORAGE
  useEffect(() => {
    // Standard storage key for shopping cart data
    const savedCart = localStorage.getItem('kynar_cart_storage');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        localStorage.removeItem('kynar_cart_storage');
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. DATA PERSISTENCE: Synchronize state with local storage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('kynar_cart_storage', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      
      // LOGIC: Digital products are unique; limit quantity to 1 per item
      if (exists) return prev; 
      
      return [...prev, { ...product, quantity: 1 }];
    });

    setLastAddedItem(product.title);
    
    // UI Logic: Reset toast state before triggering a new success notification
    setShowSuccess(false); 
    
    // Minor delay to ensure smooth UI transition for the notification
    setTimeout(() => setShowSuccess(true), 150);
  };

  const updateQuantity = (id: string, quantity: number) => {
    // Enforcing single-purchase rule for digital assets
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 1 } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('kynar_cart_storage');
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
