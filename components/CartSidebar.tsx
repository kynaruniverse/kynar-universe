"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

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
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-md"
          />

          {/* 2. SLIDING GLASS PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[100] h-full w-full md:max-w-md bg-white/80 backdrop-blur-3xl border-l border-white/20 shadow-2xl flex flex-col will-change-transform"
          >
            {/* HEADER */}
            <div className="p-6 md:p-8 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-text text-white rounded-xl">
                   <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-primary-text">
                  Your Basket
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 hover:bg-black/5 active:scale-90 rounded-full transition-all"
              >
                <X size={24} className="text-primary-text/40" />
              </button>
            </div>

            {/* ITEM LIST */}
            <div className="flex-grow overflow-y-auto px-6 py-4 md:px-8 space-y-6 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <p className="font-serif italic text-primary-text/40">Your universe is currently empty.</p>
                  <button onClick={onClose} className="mt-4 text-sm font-bold text-home-accent underline decoration-2 underline-offset-4">
                    Continue Exploring
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-24 shrink-0 rounded-2xl bg-white border border-black/5 overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow flex flex-col py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-primary-text text-sm md:text-base leading-tight">
                          {item.title}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-primary-text/20 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p className="text-xs font-serif italic text-primary-text/50 mb-auto">
                        £{item.price}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2 bg-black/5 w-fit px-3 py-1 rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="p-1 hover:text-primary-text text-primary-text/40 transition-colors"
                        >
                          <Minus size={14}/>
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="p-1 hover:text-primary-text text-primary-text/40 transition-colors"
                        >
                          <Plus size={14}/>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (
              <div className="p-6 md:p-8 bg-white/50 border-t border-white/40 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-black text-primary-text/30 block">
                      Subtotal
                    </span>
                    <span className="text-3xl font-bold tracking-tighter text-primary-text">
                      £{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Link 
                  href="/checkout" 
                  onClick={onClose}
                  className="flex items-center justify-center w-full py-5 bg-primary-text text-white rounded-full font-bold shadow-xl hover:shadow-primary-text/20 active:scale-[0.96] transition-all"
                >
                  Checkout Universe
                </Link>
                
                <p className="text-[10px] text-center text-primary-text/30 font-medium">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
