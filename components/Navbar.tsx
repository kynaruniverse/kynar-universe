"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
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

  return (
    <>
      <nav className="sticky top-4 z-[60] w-[94%] max-w-7xl mx-auto bg-white/40 backdrop-blur-xl border border-white/20 rounded-full shadow-glass transition-all duration-500">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* LEFT: MAGNETIC LOGO */}
            <div className="flex-shrink-0 -ml-2 md:-ml-4 scale-90 md:scale-100">
              <MagneticLogo />
            </div>

            {/* CENTER: DESKTOP NAVIGATION */}
            <div className="hidden md:flex space-x-8 items-center">
              {['Marketplace', 'Guides', 'Help'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="text-sm font-bold text-primary-text/60 hover:text-primary-text transition-colors tracking-tight"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* RIGHT: ICONS */}
            <div className="flex items-center space-x-2 md:space-x-5">
              <Link 
                href="/account" 
                className="hidden md:flex p-3 text-primary-text/60 hover:text-primary-text hover:bg-white/20 rounded-full transition-all"
              >
                <User size={20} />
              </Link>

              {/* CART TOGGLE */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-3 text-primary-text/80 hover:bg-white/30 active:scale-90 rounded-full transition-all"
                aria-label="Open Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 bg-home-accent text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-3 text-primary-text hover:bg-white/30 active:scale-90 rounded-full transition-all"
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
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden absolute top-[74px] left-0 right-0 bg-white/70 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-glass overflow-hidden"
            >
              <div className="px-8 py-10 space-y-6">
                <Link href="/marketplace" className="block text-3xl font-bold tracking-tighter text-primary-text">Marketplace</Link>
                
                <div className="flex flex-col space-y-4 pl-4 border-l-2 border-primary-text/5">
                  {[
                    { label: 'Tools', color: 'text-tools-accent' },
                    { label: 'Life', color: 'text-life-accent' },
                    { label: 'Home', color: 'text-cat-home-accent' }
                  ].map((cat) => (
                    <Link 
                      key={cat.label}
                      href={`/marketplace?category=${cat.label}`} 
                      className={`text-lg font-medium text-primary-text/50 hover:${cat.color} transition-colors`}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 space-y-6">
                  <Link href="/guides" className="block text-2xl font-bold tracking-tighter text-primary-text">Guides</Link>
                  <Link href="/account" className="block text-2xl font-bold tracking-tighter text-primary-text">Account</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* GLOBAL OVERLAY COMPONENTS */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
