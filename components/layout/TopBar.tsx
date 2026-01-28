"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Library, Orbit, Search, ShoppingBag, ChevronDown } from 'lucide-react';
import { SearchOverlay } from '../shared/SearchOverlay';

export const TopBar = () => {
  const { user, loading: authLoading } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWorldMenuOpen, setIsWorldMenuOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
      if (data) setProducts(data);
    };
    getProducts();
  }, []);

  if (pathname === '/success') return null;

  const worlds = [
    { name: 'Home', href: '/world/home', color: 'text-kyn-green-500' },
    { name: 'Lifestyle', href: '/world/lifestyle', color: 'text-kyn-caramel-500' },
    { name: 'Tools', href: '/world/tools', color: 'text-kyn-slate-500' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white/80 dark:bg-kyn-slate-900/80 backdrop-blur-md border-b border-kyn-slate-100 dark:border-kyn-slate-800 z-50 px-4 flex items-center justify-between">
        
        {/* Brand & World Selector (UX Guide 1.1) */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-kyn-slate-900 dark:bg-white rounded-lg flex items-center justify-center transition-transform group-active:scale-90 shadow-sm">
              <Orbit size={18} className="text-white dark:text-kyn-slate-900" />
            </div>
            <span className="hidden xs:block font-black tracking-tighter text-xl text-kyn-slate-900 dark:text-white uppercase">
              Kynar
            </span>
          </Link>

          {/* World Selector Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsWorldMenuOpen(!isWorldMenuOpen)}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors"
            >
              Worlds <ChevronDown size={12} className={`transition-transform ${isWorldMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isWorldMenuOpen && (
              <div className="absolute top-10 left-0 w-48 bg-white dark:bg-kyn-slate-800 rounded-2xl shadow-kyn-lift border border-kyn-slate-100 dark:border-kyn-slate-700 p-2 animate-fade-in">
                {worlds.map((world) => (
                  <Link
                    key={world.name}
                    href={world.href}
                    onClick={() => setIsWorldMenuOpen(false)}
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
          {/* Search */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Cart with Badge (UX Guide 1.1) */}
          <Link href="/store" className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white relative">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-kyn-green-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-bounce">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Auth/Library */}
          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-kyn-slate-50 animate-pulse ml-2" />
          ) : user ? (
            <Link 
              href="/library" 
              className={`p-2 rounded-full transition-all ${
                pathname === '/library' 
                  ? 'bg-kyn-green-50 text-kyn-green-600' 
                  : 'text-kyn-slate-400'
              }`}
            >
              <Library size={20} />
            </Link>
          ) : (
            <Link 
              href="/auth" 
              className="ml-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-kyn-slate-900 text-white dark:bg-white dark:text-kyn-slate-900 rounded-full active:scale-95 transition-transform"
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
