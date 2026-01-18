"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. DIMMED OVERLAY: Calm by Default */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-brand-text/10 backdrop-blur-[2px]"
          />

          {/* 2. MANIFEST PANEL: Physical Depth & Mocha Surfaces */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 38, stiffness: 280 }}
            className="fixed right-0 top-0 z-[200] h-full w-full md:max-w-md bg-brand-base border-l border-brand-surface/10 shadow-tactile flex flex-col will-change-transform"
          >
            {/* HEADER: Curated Identity */}
            <div className="p-10 border-b border-brand-surface/10 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="font-sans text-2xl font-semibold tracking-tight text-brand-text">
                  Order Manifest
                </h2>
                <p className="font-body text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.3em] mt-1">
                  {cartItems.length} {cartItems.length === 1 ? 'Selection' : 'Selections'}
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 hover:bg-brand-surface/20 active:scale-95 rounded-full transition-colors duration-500 group"
              >
                <X size={20} className="text-brand-text/20 group-hover:text-brand-text" strokeWidth={1.5} />
              </button>
            </div>

            {/* ITEM LIST: Space is a Luxury Signal */}
            <div className="flex-grow overflow-y-auto px-10 py-10 space-y-12 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-brand-surface/10 rounded-inner flex items-center justify-center mb-8">
                    <ShoppingBag size={24} className="text-brand-text/10" strokeWidth={1.2} />
                  </div>
                  <p className="font-body text-brand-text/40 font-medium">The manifest is currently empty.</p>
                  <button onClick={onClose} className="mt-8 font-body text-[10px] font-bold uppercase tracking-widest text-brand-text/60 underline underline-offset-8 decoration-brand-accent/20 hover:text-brand-text transition-all">
                    Browse Collection
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-8 group relative"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-inner bg-white border border-brand-surface/10 overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                    
                    <div className="flex-grow flex flex-col py-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans font-semibold text-brand-text text-[15px] tracking-tight leading-snug pr-4">
                          {item.title}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-brand-text/10 hover:text-accent-thermal transition-colors duration-500"
                        >
                          <Trash size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                      
                      <p className="font-body text-[9px] font-bold uppercase tracking-[0.25em] text-brand-text/20 mt-3">
                       Preview Asset
                      </p>
                      
                      <p className="mt-auto font-sans font-semibold text-brand-text/80 text-lg">
                        £{item.price}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER: Intelligence on Demand */}
            {cartItems.length > 0 && (
              <div className="p-10 surface-mocha border-t border-brand-surface/10 space-y-10">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] font-bold text-brand-text/20 block">
                      Total Value
                    </span>
                    <span className="font-sans text-4xl font-semibold tracking-tight text-brand-text">
                      £{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="btn-primary w-full py-6 flex items-center justify-center text-[10px] tracking-[0.3em] group"
                  >
                    REVIEW SELECTIONS <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-5 font-body text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text/20">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-brand-accent/50" /> Registry Preview
                    </div>
                    <div className="w-1 h-1 rounded-full bg-brand-text/10" />
                    <span>UK Standards</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
