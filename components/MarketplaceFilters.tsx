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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateURL('search', searchTerm);
      }
    }, 400); // Slightly slower debounce for a "calmer" feel

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
      router.push(`/marketplace?${params.toString()}`, { scroll: false });
    });
  };

  const categories = ['All', 'Tools', 'Life', 'Home'];

  return (
    <div className="w-full mb-16 space-y-10">
      
      {/* 1. SEARCH & FILTERS BAR: Physical Depth over Visual Noise */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between brand-card p-3 shadow-tactile">
        
        {/* SEARCH INPUT: Intelligence on Demand */}
        <div className="relative w-full md:w-[450px] group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-brand-text/20 group-focus-within:text-brand-accent transition-colors duration-500">
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <input 
            type="text"
            placeholder="Search the collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-12 py-5 bg-brand-base/50 border border-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-brand-surface/30 focus:bg-white transition-all duration-700 font-body text-brand-text text-sm"
          />
          {searchTerm && (
            <button 
              onClick={() => { setSearchTerm(''); updateURL('search', null); }}
              className="absolute inset-y-0 right-0 pr-6 flex items-center text-brand-text/20 hover:text-brand-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. CATEGORY PILLS (Desktop): Space is a luxury signal */}
        <div className="hidden md:flex items-center gap-2 p-1.5 bg-brand-base rounded-full mr-2">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`relative px-8 py-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-700 ${
                  isActive ? 'text-white' : 'text-brand-text/40 hover:text-brand-text'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                    className="absolute inset-0 bg-brand-text rounded-full z-0 shadow-tactile" 
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MOBILE CATEGORY SCROLLER: Touch-friendly & Tactile */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max pb-4">
          {categories.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`px-12 py-5 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] transition-all duration-500 active:scale-95 ${
                  isActive 
                  ? 'bg-brand-text text-white shadow-tactile' 
                  : 'bg-white text-brand-text/30 shadow-sm border border-brand-surface/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* TRANSITION SIGNAL: Contextual Accent (Thermal Glow) */}
      <div className="h-4 flex justify-center">
        {isPending && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-accent-thermal"
          >
            <Sparkles className="w-3 h-3" />
            Curating Selection...
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function MarketplaceFilters() {
  return (
    <Suspense fallback={<div className="h-24 w-full animate-pulse bg-brand-surface/10 rounded-card" />}>
      <FilterContent />
    </Suspense>
  );
}
