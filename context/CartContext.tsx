"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type CartItem = {
  id: number;
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
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
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
    const savedCart = localStorage.getItem('kynar_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart sync error");
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. PERSIST CHANGES
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('kynar_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // KINETIC FEEDBACK
    setLastAddedItem(product.title);
    setShowSuccess(false); // Reset first for "double tap" feedback
    setTimeout(() => setShowSuccess(true), 10);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
          .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // PERFORMANCE: Only re-calculate when items change
  const cartTotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
  [cartItems]);

  const cartCount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
  [cartItems]);

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
  if (context === undefined) throw new Error('useCart error');
  return context;
}
