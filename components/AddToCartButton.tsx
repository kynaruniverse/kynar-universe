"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  slug: string;
  image?: string;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Category-specific color mapping
  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  
  const bgAccent = isTools 
    ? 'bg-tools-accent' 
    : isLife 
    ? 'bg-life-accent' 
    : 'bg-cat-home-accent';

  const handleAdd = () => {
    if (isAdded) return;
    
    addToCart(product);
    setIsAdded(true);
    
    // Reset state after a short delay
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.button 
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleAdd}
      className={`
        relative w-full py-4 px-6 mb-8
        flex items-center justify-center gap-3
        rounded-btn font-bold tracking-tight
        transition-colors duration-300 shadow-glass
        ${isAdded ? 'bg-primary-text text-white' : `${bgAccent} text-primary-text md:text-white`}
      `}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Check size={18} strokeWidth={3} />
            <span>In Universe</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            <span>Choose</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
