"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Sparkles } from 'lucide-react';
import { useState, useEffect, useTransition, Suspense } from 'react';
import { motion } from 'framer-motion';

function FilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // DEBOUNCE: Snappy 300ms delay for mobile performance
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateURL('search', searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentSearch]);

  const updateURL = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      // scroll: false prevents jumping to the top of the page when filtering
      router.push(`/marketplace?${params.toString()}`, { scroll: false });
    });
  };

  const categories = ['All', 'Tools', 'Life', 'Home'];

  return (
    <div className="w-full mb-12 space-y-8">
      
      {/* SEARCH AND DESKTOP FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/40 backdrop-blur-3xl p-3 rounded-[32px] border border-white/40 shadow-glass">
        
        {/* 1. SEARCH INPUT */}
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-primary-text/20 group-focus-within:text-home-accent transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text"
            placeholder="Scan Universe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white/50 border border-black/5 rounded-full focus:outline-none focus:ring-4 focus:ring-home-accent/10 focus:bg-white transition-all font-sans text-primary-text text-sm font-medium tracking-tight"
          />
          {searchTerm && (
            <button 
              onClick={() => { setSearchTerm(''); updateURL('search', null); }}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-primary-text/20 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. CATEGORY PILLS (Desktop) */}
        <div className="hidden md:flex items-center gap-1 p-1.5 bg-black/5 rounded-full mr-2">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`relative px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  isActive ? 'text-white' : 'text-primary-text/40 hover:text-primary-text'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-primary-text rounded-full z-0 shadow-lg" 
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MOBILE CATEGORY SCROLLER */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide pb-2">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-90 ${
                  isActive 
                  ? 'bg-primary-text text-white shadow-xl scale-105' 
                  : 'bg-white/40 backdrop-blur-md border border-white/40 text-primary-text/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* DYNAMIC TRANSITION SIGNAL */}
      <div className="h-2 flex justify-center">
        {isPending && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-home-accent"
          >
            <Sparkles className="w-3 h-3 animate-pulse" />
            Refining Signal
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Wrap in Suspense to satisfy Next.js useSearchParams() requirements
export default function MarketplaceFilters() {
  return (
    <Suspense fallback={<div className="h-32 w-full animate-pulse bg-white/20 rounded-[32px]" />}>
      <FilterContent />
    </Suspense>
  );
}
