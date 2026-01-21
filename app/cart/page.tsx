"use client";

export const dynamic = "force-dynamic";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Added Import
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight, Trash2, ShieldCheck, Scale, Sparkles } from 'lucide-react';
import { useCart } from '../../context/AppProvider';
import { getCategoryTheme } from '../../lib/theme';
// Import the server action if you want to wire it up later
import { processCheckout } from './actions'; 

export default function CartPage() {
  // FIXED: Changed 'cartItems' to 'cart'
  const { cart, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) return <EmptyCartState />;

  return (
    <main className="min-h-screen bg-brand-base py-24 px-6 selection:bg-brand-accent/20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-semibold text-brand-text tracking-tight mb-4">Checkout</h1>
          <p className="text-brand-text/40 font-medium">Review your selection. Purchase access will unlock shortly.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode='popLayout'>
              {/* FIXED: Iterating over 'cart' */}
              {cart.map((item) => (
                <CartLineItem key={item.id} item={item} onRemove={removeFromCart} />
              ))}
            </AnimatePresence>
          </div>

          <OrderSummary total={cartTotal} />
        </div>
      </div>
    </main>
  );
}

function CartLineItem({ item, onRemove }: { item: any; onRemove: (id: string) => void }) {
  const styles = getCategoryTheme(item.category);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`card-elevated p-6 md:p-8 flex gap-6 md:gap-10 items-center shadow-tactile-hover group border-l-4 ${styles.border}`}
    >
      <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-base rounded-inner overflow-hidden flex-shrink-0 relative">
        {/* FIXED: Used Next.js Image component */}
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-liquid" 
        />
      </div>

      <div className="flex-grow">
        <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${styles.text}`}>
          {item.category || "Digital Product"}
        </div>
        <h3 className="font-semibold text-xl md:text-2xl text-brand-text tracking-tight leading-none">{item.name}</h3>
        <p className="text-[11px] text-brand-text/30 font-medium uppercase tracking-widest mt-3">Preview Mode</p>
      </div>

      <div className="flex flex-col items-end gap-6">
        <p className="font-semibold text-2xl text-brand-text tracking-tight">£{item.price}</p>
        <button onClick={() => onRemove(item.id)} className="p-3 text-brand-text/10 hover:text-accent-thermal transition-colors">
          <Trash2 size={18} strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
}


/**
 * SUB-COMPONENT: Summary Sidebar
 */
function OrderSummary({ total }: { total: number }) {
  return (
    <div className="lg:sticky lg:top-32">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-elevated p-10 surface-frosted shadow-tactile">
        <h2 className="text-[10px] font-bold text-brand-text/30 mb-10 tracking-[0.3em] uppercase">Order Summary</h2>
        
        <div className="space-y-6 mb-12">
          <div className="flex justify-between text-[11px] font-bold text-brand-text/40 uppercase tracking-widest">
            <span>Items Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-brand-accent text-[11px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={12}/> Status</span>
            <span>Preview</span>
          </div>
          <div className="pt-8 border-t border-brand-surface/20 flex justify-between items-end">
            <span className="text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.2em] pb-1">Value</span>
            <span className="text-5xl font-semibold text-brand-text tracking-tight">£{total.toFixed(2)}</span>
          </div>
        </div>

        <button disabled className="btn-primary w-full py-6 flex items-center justify-center opacity-40 cursor-not-allowed group mb-10">
          <span className="flex items-center gap-2">Launching Q1 2026 <ArrowRight size={16} /></span>
        </button>

        <div className="flex flex-col gap-5 border-t border-brand-surface/20 pt-8">
          <div className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-text/20">
            <ShieldCheck size={14} /> Shop Preview
          </div>
          <div className="flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-text/20">
            <Scale size={14} /> UK Digital Standards
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * SUB-COMPONENT: Empty Cart State
 */
function EmptyCartState() {
  return (
    <main className="min-h-screen bg-brand-base flex flex-col items-center justify-center p-6 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card-elevated p-16 md:p-24 max-w-2xl w-full shadow-tactile">
        <div className="w-20 h-20 bg-brand-base rounded-inner flex items-center justify-center mx-auto mb-10 text-brand-text/10">
          <ShoppingCart size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-brand-text mb-6 tracking-tight">Your cart is empty</h1>
        <p className="text-brand-text/40 mb-12 leading-relaxed max-w-sm mx-auto">Explore the products in our collection to preview digital solutions.</p>
        <Link href="/marketplace" className="btn-primary inline-flex items-center gap-3">
          Browse Products <ArrowRight size={16} />
       = </Link>
      </motion.div>
    </main>
  );
}
