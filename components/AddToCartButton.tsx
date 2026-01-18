"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Updated to match your Supabase UUID structure
type Product = {
  id: string; // Changed from number to string for UUID compatibility
  title: string;
  price: number;
  slug: string;
  image?: string;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  
  // Refined color logic for maximum premium contrast
  const accentClasses = isTools 
    ? 'bg-tools-accent text-white shadow-tools-accent/20' 
    : isLife 
    ? 'bg-life-accent text-primary-text shadow-life-accent/20' 
    : 'bg-cat-home-accent text-primary-text shadow-cat-home-accent/20';

  const handleAdd = () => {
    if (isAdded) return;
    
    // Transmission to Cart Context
    addToCart(product);
    setIsAdded(true);
    
    // Auto-reset pulse
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <motion.button 
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAdd}
      className={`
        relative w-full py-5 px-8
        flex items-center justify-center gap-3
        rounded-full font-black uppercase tracking-[0.2em] text-[10px]
        transition-all duration-500 shadow-xl overflow-hidden
        ${isAdded ? 'bg-primary-text text-white' : accentClasses}
      `}
    >
      {/* Background glow effect on click */}
      <AnimatePresence>
        {isAdded && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white rounded-full"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex items-center gap-2"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>Item Added</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex items-center gap-2"
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
