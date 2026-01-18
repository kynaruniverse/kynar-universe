"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import CartSidebar from "./CartSidebar";
import MagneticLogo from "./MagneticLogo";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const pathname = usePathname();

  // Close mobile menu automatically on route change
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
      <nav className="sticky top-6 z-[60] w-[92%] max-w-7xl mx-auto bg-white/40 backdrop-blur-3xl border border-white/30 rounded-full shadow-glass transition-all duration-500">
        <div className="px-4 md:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* LEFT: MAGNETIC LOGO */}
            <div className="flex-shrink-0 -ml-1 md:-ml-2 scale-90 md:scale-100">
              <MagneticLogo />
            </div>

            {/* CENTER: DESKTOP NAVIGATION */}
            <div className="hidden md:flex space-x-10 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive ? 'text-primary-text' : 'text-primary-text/40 hover:text-primary-text'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="navUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-home-accent rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: ICONS & CTA */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <Link 
                href="/account" 
                className={`hidden md:flex p-3 rounded-full transition-all ${
                  pathname === '/account' ? 'bg-primary-text text-white shadow-lg' : 'text-primary-text/40 hover:text-primary-text hover:bg-white/40'
                }`}
              >
                <User size={18} />
              </Link>

              {/* CART TOGGLE */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-3 text-primary-text hover:bg-white/40 active:scale-90 rounded-full transition-all group"
                aria-label="Open Cart"
              >
                <ShoppingCart size={20} className="group-hover:rotate-[-10deg] transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 bg-home-accent text-white text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center shadow-sm px-1">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-3 text-primary-text hover:bg-white/40 active:scale-90 rounded-full transition-all"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="md:hidden absolute top-[110%] left-0 right-0 bg-white/60 backdrop-blur-3xl border border-white/40 rounded-[40px] shadow-glass overflow-hidden mx-2"
            >
              <div className="p-8 space-y-8">
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      className="text-4xl font-black tracking-tighter text-primary-text flex justify-between items-center group"
                    >
                      {link.name}
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-home-accent" />
                    </Link>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-black/5 flex flex-col space-y-4">
                  <Link 
                    href="/account" 
                    className="w-full py-5 bg-primary-text text-white rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all uppercase tracking-widest text-xs"
                  >
                    <Sparkles size={14} /> Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* CART SIDEBAR OVERLAY */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
