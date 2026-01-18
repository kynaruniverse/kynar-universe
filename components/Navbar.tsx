"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import CartSidebar from "./CartSidebar";
import MagneticLogo from "./MagneticLogo";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // PHASE 1 ALIGNMENT: Changing 'Store' to 'Collection'
  const navLinks = [
    { name: 'The Collection', href: '/marketplace' },
    { name: 'Guides', href: '/guides' },
    { name: 'Help', href: '/help' },
  ];

  return (
    <>
      {/* 1. PREVIEW MODE PROTOCOL BANNER */}
      {/* Positioned at the very top of the viewport to set immediate expectations */}
      <div className="w-full bg-brand-surface/10 py-2 border-b border-brand-surface/20">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-text/60 text-center px-6">
          The Kynar Registry is currently in preview. Assets and access will unlock soon.
        </p>
      </div>

      {/* 2. QUIET NAVIGATION FOUNDATION */}
      <nav className="sticky top-6 z-[60] w-[94%] max-w-7xl mx-auto brand-nav rounded-full shadow-tactile transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]">
        <div className="px-6">
          <div className="flex justify-between items-center h-16 md:h-22">
            
            {/* LEFT: BRANDING */}
            <div className="flex-shrink-0 scale-90 md:scale-100">
              <MagneticLogo />
            </div>

            {/* CENTER: NAVIGATION (DESKTOP) */}
            <div className="hidden md:flex space-x-12 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`relative font-body text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-700 ${
                      isActive ? 'text-brand-text' : 'text-brand-text/30 hover:text-brand-text'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="navUnderline"
                        className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-brand-accent rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: TACTILE ACTIONS */}
            <div className="flex items-center space-x-2 md:space-x-5">
              <Link 
                href="/account" 
                className={`p-3 rounded-full transition-all duration-700 ${
                  pathname === '/account' 
                    ? 'bg-brand-text text-white shadow-tactile' 
                    : 'text-brand-text/30 hover:text-brand-text hover:bg-brand-surface/20'
                }`}
              >
                <User size={19} strokeWidth={1.5} />
              </Link>

              {/* CART TOGGLE */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-3 text-brand-text/30 hover:text-brand-text hover:bg-brand-surface/20 active:scale-95 rounded-full transition-all duration-700 group"
                aria-label="Open Cart"
              >
                <ShoppingCart size={20} strokeWidth={1.5} className="group-hover:rotate-[-6deg] transition-transform" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 bg-brand-accent text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-tactile px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-3 text-brand-text/40 hover:text-brand-text hover:bg-brand-surface/20 active:scale-90 rounded-full transition-all"
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="md:hidden absolute top-[115%] left-0 right-0 bg-white shadow-tactile rounded-[40px] overflow-hidden mx-1 p-10"
            >
              <div className="space-y-12">
                <div className="flex flex-col space-y-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      className="font-sans text-4xl font-semibold tracking-tight text-brand-text flex justify-between items-center group"
                    >
                      {link.name}
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all text-brand-accent translate-x-[-10px] group-hover:translate-x-0" />
                    </Link>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-brand-surface/20 flex flex-col space-y-4">
                  <Link 
                    href="/account" 
                    className="btn-primary w-full flex items-center justify-center gap-3 text-[10px] tracking-[0.25em]"
                  >
                    <Sparkles size={14} /> Register Identity
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
