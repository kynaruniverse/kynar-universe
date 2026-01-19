"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'; // Added useSearchParams
import { Menu, X, ShoppingCart, User, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryTheme } from '../lib/theme'; // 1. Import theme utility
import CartSidebar from "./CartSidebar";
import MagneticLogo from "./MagneticLogo";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Added to detect category in URL

  // 2. Dynamic Theme Detection
  // This looks at the URL to see if we are in a specific category (Tools, Life, Home)
  const activeCategory = searchParams.get('category') || undefined;
  const theme = getCategoryTheme(activeCategory);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'The Store', href: '/marketplace' },
    { name: 'Guides', href: '/guides' },
    { name: 'Help', href: '/help' },
  ];

  return (
    <>
      <nav className="relative z-[60] w-full brand-nav border-b border-brand-surface/20 shadow-sm transition-all duration-base">
        <div className="px-6">
          <div className="flex justify-between items-center h-16 md:h-22">
            
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
                    className={`relative font-body text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-slow ${
                      isActive ? 'text-brand-text' : 'text-brand-text/30 hover:text-brand-text'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="navUnderline"
                        // 3. Underline color now matches the active category theme
                        className={`absolute -bottom-2 left-0 right-0 h-[1.5px] rounded-full ${theme.bg}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 md:space-x-5">
              <Link href ="/account"
              aria-label="Account"
              className={`p-3 rounded-full transition-all duration-slow ${
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
                className="relative p-3 text-brand-text/30 hover:text-brand-text hover:bg-brand-surface/20 active:scale-95 rounded-full transition-all duration-slow group"
              >
                <ShoppingCart size={20} strokeWidth={1.5} className="group-hover:rotate-[-6deg] transition-transform" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    // 4. Cart badge color now matches the active category theme
                    className={`absolute top-2 right-2 text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-tactile px-1 transition-colors duration-slow ${theme.bg}`}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="md:hidden p-3 text-brand-text/40 hover:text-brand-text hover:bg-brand-surface/20 active:scale-90 rounded-full transition-all"
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
                      {/* 5. Mobile arrow icon now matches the theme color */}
                      <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 ${theme.text}`} />
                    </Link>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-brand-surface/20 flex flex-col space-y-4">
                  <Link 
                    href="/account" 
                    className={`btn-primary w-full flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] transition-colors duration-slow ${theme.bg} hover:brightness-110`}
                  >
                    <Sparkles size={14} /> Create Account
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
