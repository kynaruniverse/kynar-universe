"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext'; // <--- 1. IMPORT THE BRAIN

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart(); // <--- 2. CONNECT TO THE BRAIN

  return (
    <nav className="sticky top-0 z-50 w-full bg-home-surface/90 backdrop-blur-sm border-b border-home-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold font-sans text-primary-text tracking-tight">
              KYNAR
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-primary-text hover:text-home-accent font-medium transition-colors">
              Home
            </Link>
            <Link href="/marketplace" className="text-primary-text hover:text-home-accent font-medium transition-colors">
              Marketplace
            </Link>
            <Link href="/guides" className="text-primary-text hover:text-home-accent font-medium transition-colors">
              Guides
            </Link>
          </div>

          {/* RIGHT: ICONS */}
          <div className="flex items-center space-x-6">
            
            {/* Account Icon (Desktop) */}
            <Link href="/account" className="hidden md:block text-primary-text hover:text-home-accent">
              <User size={24} />
            </Link>

            {/* Cart Icon (Dynamic) */}
            <Link href="/cart" className="text-primary-text hover:text-home-accent relative">
              <ShoppingCart size={24} />
              
              {/* 3. SHOW REAL COUNT (Only if greater than 0) */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-home-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-primary-text hover:text-home-accent focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-home-surface border-t border-home-accent/20">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-medium text-primary-text border-b border-gray-100">
              Home
            </Link>
            <Link href="/marketplace" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-medium text-primary-text border-b border-gray-100">
              Marketplace
            </Link>
            
            <Link href="/marketplace?category=Tools" onClick={() => setIsOpen(false)} className="block pl-4 py-2 text-base text-gray-600 hover:text-tools-accent">
              • Tools
            </Link>
            <Link href="/marketplace?category=Life" onClick={() => setIsOpen(false)} className="block pl-4 py-2 text-base text-gray-600 hover:text-life-accent">
              • Life
            </Link>
            <Link href="/marketplace?category=Home" onClick={() => setIsOpen(false)} className="block pl-4 py-2 text-base text-gray-600 hover:text-cat-home-accent">
              • Home
            </Link>

            <Link href="/guides" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-medium text-primary-text border-b border-gray-100">
              Guides
            </Link>
            <Link href="/account" onClick={() => setIsOpen(false)} className="block py-3 text-lg font-medium text-primary-text">
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
