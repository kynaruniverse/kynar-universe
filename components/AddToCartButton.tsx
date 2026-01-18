"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Standardized Product Type for Muse Engine
type Product = {
  id: string; 
  title: string;
  price: number;
  slug: string;
  image?: string;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (isAdded) return;
    
    [span_6](start_span)// PHASE 1: Process Selection Intent (Pre-Acquisition)[span_6](end_span)
    addToCart(product);
    setIsAdded(true);
    
    [span_7](start_span)// Intelligence Reset: allow for multiple selections after feedback pulse[span_7](end_span)
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
        transition-all duration-700 shadow-tactile overflow-hidden
        ${isAdded 
          ? 'bg-brand-accent text-white' 
          : 'bg-brand-text text-white hover:bg-brand-accent shadow-tactile-hover'
        }
      `}
    >
      [span_8](start_span){/* Intelligence Reveal: Subtle internal glow on success[span_8](end_span) */}
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
            <span>Added to Manifest</span>
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
            <span>Preview Selection</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
