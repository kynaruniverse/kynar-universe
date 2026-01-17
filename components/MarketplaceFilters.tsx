"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect, useTransition } from 'react';
import { motion } from 'framer-motion';

export default function MarketplaceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // DEBOUNCE: Mobile-friendly URL update
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateURL('search', searchTerm);
      }
    }, 400); // Slightly faster for snappier mobile feel

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentSearch]);

  const updateURL = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // useTransition keeps the UI responsive while the URL/Data updates
    startTransition(() => {
      router.push(`/marketplace?${params.toString()}`, { scroll: false });
    });
  };

  const categories = ['All', 'Tools', 'Life', 'Home'];

  return (
    <div className="w-full mb-10 space-y-6">
      
      {/* SEARCH AND DESKTOP FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/40 backdrop-blur-xl p-3 md:p-4 rounded-[24px] border border-white/40 shadow-glass">
        
        {/* 1. SEARCH INPUT */}
        <div className="relative w-full md:w-80 lg:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary-text/30 group-focus-within:text-home-accent transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text"
            placeholder="Search the Universe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-white/50 border border-black/5 rounded-full focus:outline-none focus:ring-2 focus:ring-home-accent/30 focus:bg-white transition-all font-sans text-primary-text text-base"
          />
          {searchTerm && (
            <button 
              onClick={() => { setSearchTerm(''); updateURL('search', null); }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary-text/20 hover:text-primary-text/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. CATEGORY PILLS (Desktop) */}
        <div className="hidden md:flex items-center gap-2 p-1 bg-black/5 rounded-full">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-primary-text/50 hover:text-primary-text'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-primary-text rounded-full z-0" 
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MOBILE CATEGORY SCROLLER (Premium Horizontal Swipe) */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`px-8 py-3 rounded-full text-sm font-black transition-all active:scale-95 ${
                  isActive 
                  ? 'bg-primary-text text-white shadow-lg' 
                  : 'bg-white/60 border border-black/5 text-primary-text/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Loading Indicator */}
      {isPending && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-home-accent animate-pulse"
        >
          Updating Universe...
        </motion.div>
      )}
    </div>
  );
}
