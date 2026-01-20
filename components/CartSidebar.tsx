"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, cartCount } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-text/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 border-b border-color-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-brand-text" />
                <h2 className="text-xl font-bold text-brand-text">Your Cart</h2>
                <span className="bg-brand-surface px-2 py-0.5 rounded-full text-[10px] font-bold text-brand-text">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-brand-surface rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-surface flex items-center justify-center text-brand-text/20">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-color-muted">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="text-brand-accent font-bold text-sm uppercase tracking-widest hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-color-border shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-bold text-brand-text mb-1">{item.name}</h3>
                        <p className="text-xs text-color-muted mb-2">Quantity: {item.quantity}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">£{(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-brand-text/30 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-color-border space-y-6 bg-brand-surface/5">
                <div className="flex items-center justify-between">
                  <span className="text-color-muted">Total</span>
                  <span className="text-2xl font-bold text-brand-text">£{totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full py-5 bg-brand-text text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent transition-all duration-base shadow-tactile group">
                  Checkout Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
