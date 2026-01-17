"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. DIMMED OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          {/* 2. SLIDING GLASS PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[100] h-full w-full md:max-w-md bg-white/90 backdrop-blur-3xl border-l border-white/40 shadow-2xl flex flex-col will-change-transform"
          >
            {/* HEADER */}
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-white/50">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black font-sans tracking-tighter text-primary-text uppercase">
                    Manifest
                  </h2>
                  <Sparkles size={16} className="text-home-accent animate-pulse" />
                </div>
                <p className="text-[10px] font-bold text-primary-text/30 uppercase tracking-[0.2em]">
                  {cartItems.length} Sector Assets
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 hover:bg-black/5 active:scale-90 rounded-full transition-all"
              >
                <X size={20} className="text-primary-text/40" />
              </button>
            </div>

            {/* ITEM LIST */}
            <div className="flex-grow overflow-y-auto px-8 py-6 space-y-8 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 bg-black/5 rounded-[24px] flex items-center justify-center mb-6">
                    <ShoppingBag size={24} className="text-primary-text/10" />
                  </div>
                  <p className="font-serif italic text-primary-text/40 text-lg">Your manifest is currently clear.</p>
                  <button onClick={onClose} className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary-text underline underline-offset-8 decoration-home-accent/30">
                    Return to Marketplace
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={item.id} 
                    className="flex gap-6 group relative"
                  >
                    <div className="w-20 h-20 shrink-0 rounded-[20px] bg-white border border-black/5 overflow-hidden shadow-inner">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    
                    <div className="flex-grow flex flex-col py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-primary-text text-sm uppercase tracking-tight leading-tight pr-4">
                          {item.title}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-primary-text/10 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary-text/20 mt-1">
                        Digital License
                      </p>
                      
                      <p className="mt-auto font-black text-primary-text/60">
                        £{item.price}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white/80 border-t border-white/40 space-y-8 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary-text/20 block">
                      Total Acquisition
                    </span>
                    <span className="text-4xl font-black tracking-tighter text-primary-text">
                      £{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="flex items-center justify-center w-full py-6 bg-primary-text text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-primary-text/20 active:scale-[0.98] transition-all group"
                  >
                    Proceed to Transmission <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-primary-text/20">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={12} /> Secure
                    </div>
                    <div className="w-1 h-1 rounded-full bg-black/10" />
                    <span>UK Standard</span>
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
