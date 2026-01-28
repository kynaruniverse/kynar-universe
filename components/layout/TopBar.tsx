"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/index';
import { Library, Orbit, Search, ShoppingBag, ChevronDown } from 'lucide-react';
import { SearchOverlay } from '../shared/SearchOverlay';

/**
 * TopBar Component:
 * Global navigation that handles "World" discovery and User state.
 */
export const TopBar = () => {
  const { user, loading: authLoading } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWorldMenuOpen, setIsWorldMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
      if (data) setProducts(data as Product[]);
    };
    getProducts();
  }, []);

  // UX Guardrail: Hide navigation during focused checkout success
  if (pathname === '/success') return null;

  const worlds = [
    { name: 'Home', href: '/world/home', color: 'text-kyn-green-600' },
    { name: 'Lifestyle', href: '/world/lifestyle', color: 'text-kyn-caramel-600' },
    { name: 'Tools', href: '/world/tools', color: 'text-kyn-slate-500' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white/80 dark:bg-kyn-slate-900/80 backdrop-blur-md border-b border-kyn-slate-100 dark:border-kyn-slate-800 z-50 px-4 flex items-center justify-between">
        
        {/* Brand & World Selector */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-kyn-slate-900 dark:bg-white rounded-xl flex items-center justify-center transition-transform group-active:scale-90 shadow-sm">
              <Orbit size={18} className="text-white dark:text-kyn-slate-900" />
            </div>
            <span className="hidden sm:block font-black tracking-tighter text-xl text-kyn-slate-900 dark:text-white uppercase">
              Kynar
            </span>
          </Link>

          {/* World Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsWorldMenuOpen(!isWorldMenuOpen)}
              onBlur={() => setTimeout(() => setIsWorldMenuOpen(false), 200)}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors outline-none"
            >
              Worlds <ChevronDown size={12} className={`transition-transform duration-300 ${isWorldMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isWorldMenuOpen && (
              <div className="absolute top-10 left-0 w-48 bg-white dark:bg-kyn-slate-800 rounded-2xl shadow-kyn-lift border border-kyn-slate-100 dark:border-kyn-slate-700 p-2 z-[60]">
                {worlds.map((world) => (
                  <Link
                    key={world.name}
                    href={world.href}
                    className="flex items-center px-4 py-3 rounded-xl hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-700/50 transition-colors"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${world.color}`}>
                      {world.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors"
          >
            <Search size={20} />
          </button>

          <Link href="/store" className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white relative">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-kyn-green-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </Link>

          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-kyn-slate-100 dark:bg-kyn-slate-800 animate-pulse ml-2" />
          ) : user ? (
            <Link 
              href="/library" 
              className={`p-2 rounded-xl transition-all ml-1 ${
                pathname === '/library' 
                  ? 'bg-kyn-green-50 text-kyn-green-600 dark:bg-kyn-green-900/20 dark:text-kyn-green-400' 
                  : 'text-kyn-slate-400 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-800'
              }`}
            >
              <Library size={20} />
            </Link>
          ) : (
            <Link 
              href="/auth" 
              className="ml-2 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 bg-kyn-slate-900 text-white dark:bg-white dark:text-kyn-slate-900 rounded-full active:scale-95 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        products={products} 
      />
    </>
  );
};
