"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from 'lucide-react';
// ✅ FIX 1: Import from the unified AppProvider
import { useCart } from '../context/AppProvider';
import { getCategoryTheme } from '../lib/theme';

type Product = {
  id: string; 
  // ✅ FIX 2: Support both 'name' and 'title' to prevent crashes
  title?: string; 
  name?: string;
  price: number;
  slug: string;
  image?: string;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const theme = getCategoryTheme(product.category);

  const handleAdd = () => {
    if (isAdded) return;
    
    addToCart({
      id: product.id,
      // ✅ FIX 3: Fallback logic handles both data shapes
      name: product.name || product.title || "Untitled Product", 
      price: product.price,
      image: product.image || '', 
      category: product.category,
      slug: product.slug, 
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <motion.button 
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAdd}
      className={`
        relative w-full py-6 px-10
        flex items-center justify-center gap-4
        rounded-full font-semibold uppercase tracking-[0.25em] text-[10px]
        transition-all duration-slow shadow-tactile overflow-hidden
        ${isAdded 
          ? `${theme.bg} text-white` 
          : `bg-brand-text text-white hover:${theme.bg} shadow-tactile-hover`
        }
      `}
    >
      <AnimatePresence>
        {isAdded && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <Check size={14} strokeWidth={3} />
            <span>{theme.label} Added</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <ShoppingBag size={14} strokeWidth={2} />
            <span>Select for {theme.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
