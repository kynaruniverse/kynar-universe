"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import EmptyState from '@/components/marketplace/EmptyState';
import { Product, World } from '@/types/index';

/**
 * StorePage: The Marketplace Hub
 * Aligned with UX Guide 4.1: Real-time asset discovery with high-intent filtering.
 */
export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeWorld, setActiveWorld] = useState<World | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts((data as Product[]) || []);
    } catch (err) {
      console.error("Store Manifest Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Refined filtering logic for Universe exploration
  const filteredProducts = products.filter(p => {
    const matchesWorld = activeWorld === 'All' || p.world === activeWorld;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.hero_benefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWorld && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pb-32">
      {/* Sticky Header with World Selector (UX Guide 4.1) */}
      <header className="sticky top-0 z-30 bg-kyn-canvas/80 dark:bg-kyn-slate-900/80 backdrop-blur-xl border-b border-kyn-slate-100 dark:border-kyn-slate-800 p-4 pt-16 md:pt-4">
        <div className="max-w-2xl mx-auto space-y-4">
          
          {/* Search Input - Real-time asset discovery */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-300 group-focus-within:text-kyn-green-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search the universe..." 
              className="w-full bg-white dark:bg-kyn-slate-800 p-4 pl-12 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none text-sm font-medium focus:ring-4 focus:ring-kyn-green-500/10 transition-all dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* World Filter Chips (Visual Guide 9.1) */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['All', 'Home', 'Lifestyle', 'Tools'].map((world) => {
              const isActive = activeWorld === world;
              return (
                <button
                  key={world}
                  onClick={() => setActiveWorld(world as World | 'All')}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                    isActive 
                    ? 'bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 border-kyn-slate-900 dark:border-white shadow-kyn-lift' 
                    : 'bg-white dark:bg-kyn-slate-800 text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-700 hover:border-kyn-slate-300'
                  }`}
                >
                  {world}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="p-6 max-w-2xl mx-auto mt-6">
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full aspect-[4/5] bg-white dark:bg-kyn-slate-800 rounded-kyn animate-pulse border border-kyn-slate-50 dark:border-kyn-slate-800" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={(p) => addToCart(p)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-10">
            <EmptyState 
              onReset={() => { setActiveWorld('All'); setSearchQuery(''); }} 
              onSelectWorld={(world) => setActiveWorld(world as World)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
