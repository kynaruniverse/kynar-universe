"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MarketplaceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // LOCAL STATE (For immediate UI feedback)
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // DEBOUNCE SEARCH (Wait 500ms after typing stops to update URL)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateURL('search', searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentSearch]);

  // HELPER: Update URL parameters without reloading page
  const updateURL = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset page to 1 if filter changes (optional for future pagination)
    router.push(`/marketplace?${params.toString()}`, { scroll: false });
  };

  const categories = ['All', 'Tools', 'Life', 'Home'];

  return (
    <div className="w-full mb-12">
      
      {/* DESKTOP FILTER BAR */}
      <div className="bg-white p-4 rounded-card border border-black/5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* 1. SEARCH INPUT */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text"
            placeholder="Search titles, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-btn focus:outline-none focus:ring-2 focus:ring-home-accent transition-all font-sans text-primary-text"
          />
          {searchTerm && (
            <button 
              onClick={() => { setSearchTerm(''); updateURL('search', null); }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. CATEGORY TOGGLES (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-50 p-1 rounded-btn border border-gray-200">
          {categories.map((cat) => {
            const isActive = currentCategory === cat || (cat === 'All' && !currentCategory);
            // Dynamic styling based on category
            let activeClass = "bg-white text-primary-text shadow-sm ring-1 ring-black/5";
            if (isActive && cat === 'Tools') activeClass = "bg-tools-accent text-white shadow-md";
            if (isActive && cat === 'Life') activeClass = "bg-life-accent text-white shadow-md";
            if (isActive && cat === 'Home') activeClass = "bg-cat-home-accent text-primary-text shadow-md";
            if (isActive && cat === 'All') activeClass = "bg-primary-text text-white shadow-md";

            return (
              <button
                key={cat}
                onClick={() => updateURL('category', cat)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isActive ? activeClass : 'text-primary-text/60 hover:text-primary-text hover:bg-white/50'}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* MOBILE FILTER TOGGLE */}
        <button 
          className="md:hidden w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-btn text-primary-text/80 font-medium bg-gray-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Filter className="w-4 h-4 mr-2" /> 
          Filters {currentCategory !== 'All' ? `(${currentCategory})` : ''}
        </button>

      </div>

      {/* MOBILE CATEGORY DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 grid grid-cols-2 gap-2 animate-fade-in-down">
           {categories.map((cat) => (
             <button
                key={cat}
                onClick={() => { updateURL('category', cat); setIsMobileMenuOpen(false); }}
                className={`px-4 py-3 rounded-btn text-sm font-bold border transition-all ${currentCategory === cat ? 'border-primary-text bg-primary-text text-white' : 'border-gray-200 bg-white text-primary-text'}`}
             >
               {cat}
             </button>
           ))}
        </div>
      )}
    </div>
  );
}
