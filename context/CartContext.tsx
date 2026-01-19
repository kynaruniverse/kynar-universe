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
  lastAddedCategory: string; // Added to track category branding
  isInitialized: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState("");
  const [lastAddedCategory, setLastAddedCategory] = useState(""); // State for category tracking

  // 1. INITIALIZE FROM LOCAL STORAGE
  useEffect(() => {
    // Only access localStorage on client-side
    if (typeof window === 'undefined') return;
    
    const savedCart = localStorage.getItem('kynar_cart_storage');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data:', e);
        localStorage.removeItem('kynar_cart_storage');
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. DATA PERSISTENCE
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
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
    setLastAddedCategory(product.category || ""); // Capture category for the toast
    
    // UI Logic: Reset toast state
    setShowSuccess(false); 
    
    // Minor delay to ensure smooth UI transition
    setTimeout(() => setShowSuccess(true), 150);
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
      lastAddedCategory, // Shared with the Toast Wrapper
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
