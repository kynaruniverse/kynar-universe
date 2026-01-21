"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

/** ======================
 * TYPES
 * ====================== */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  slug: string;
}

export interface AppContextType {
  // Auth
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  showSuccess: boolean;
  lastAddedItem: string;
  lastAddedCategory: string;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  // ✅ NEW: Allow UI to manually dismiss toasts
  dismissToast: () => void;
}

/** ======================
 * CONTEXT
 * ====================== */
const AppContext = createContext<AppContextType | undefined>(undefined);

/** ======================
 * PROVIDER
 * ====================== */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /** ----------------------
   * AUTH STATE
   * --------------------- */
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  /** ----------------------
   * CART STATE
   * --------------------- */
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState("");
  const [lastAddedCategory, setLastAddedCategory] = useState("");
  
  /** ----------------------
   * AUTH EFFECT
   * --------------------- */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  /** ----------------------
   * SIGN OUT
   * --------------------- */
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setCart([]);
  }, []);
  
  /** ----------------------
   * CART FUNCTIONS
   * --------------------- */
  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }
    const { data, error } = await supabase
      .from("carts")
      .select("items")
      .eq("user_id", user.id)
      .single();
    
    if (!error && data?.items) setCart(data.items);
    else setCart([]);
  }, [user]);
  
  const persistCart = useCallback(
    async (items: CartItem[]) => {
        if (!user) return;
        const { error } = await supabase
          .from("carts")
          .upsert({ user_id: user.id, items }, { onConflict: "user_id" });
        if (error) console.error("Error saving cart:", error);
      },
      [user]
  );
  
  const addToCart = useCallback(
    async (item: CartItem) => {
        setLastAddedItem(item.name);
        setLastAddedCategory(item.category ?? "");
        setShowSuccess(true);
        
        setCart((prev) => {
          const existing = prev.find((i) => i.id === item.id);
          const updated = existing ?
            prev.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ) :
            [...prev, { ...item, quantity: 1 }];
          persistCart(updated);
          return updated;
        });
        
        // Auto-hide feedback after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      },
      [persistCart]
  );
  
  const removeFromCart = useCallback(
    async (id: string) => {
        setCart((prev) => {
          const updated = prev.filter((i) => i.id !== id);
          persistCart(updated);
          return updated;
        });
      },
      [persistCart]
  );
  
  const clearCart = useCallback(async () => {
    setCart([]);
    await persistCart([]);
  }, [persistCart]);
  
  const refreshCart = useCallback(async () => {
    await fetchCart();
  }, [fetchCart]);

  // ✅ NEW: Manual dismiss function
  const dismissToast = useCallback(() => {
    setShowSuccess(false);
  }, []);
  
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
  useEffect(() => {
    fetchCart();
  }, [user, fetchCart]);
  
  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        signOut,
        cart,
        cartCount,
        cartTotal,
        showSuccess,
        lastAddedItem,
        lastAddedCategory,
        addToCart,
        removeFromCart,
        clearCart,
        refreshCart,
        dismissToast, // Exported here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

export const useAuth = () => {
  const context = useApp();
  return { 
    user: context.user, 
    loading: context.loading, 
    signOut: context.signOut 
  };
};

export const useCart = () => {
  const context = useApp();
  return {
    cart: context.cart,
    cartCount: context.cartCount,
    cartTotal: context.cartTotal,
    showSuccess: context.showSuccess,
    lastAddedItem: context.lastAddedItem,
    lastAddedCategory: context.lastAddedCategory,
    addToCart: context.addToCart,
    removeFromCart: context.removeFromCart,
    clearCart: context.clearCart,
    refreshCart: context.refreshCart,
    dismissToast: context.dismissToast, // ✅ Exported via hook
  };
};
