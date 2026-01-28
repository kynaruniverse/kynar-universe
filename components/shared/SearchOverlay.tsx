"use client";
import React, { useState } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { ProductCard } from '../ProductCard';
import { Product, World } from '@/types/index';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

/**
 * SearchOverlay Component
 * Aligned with UX Guide 2.3: Immersive search with World-specific filtering.
 */
export const SearchOverlay = ({ isOpen, onClose, products }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<World | 'All'>('All');

  if (!isOpen) return null;

  const filtered = products.filter((p) => 
    (filter === 'All' || p.world === filter) && 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-kyn-slate-900 flex flex-col transition-all duration-300 ease-out">
      {/* Search Header */}
      <div className="p-6 border-b border-kyn-slate-100 dark:border-kyn-slate-800 flex items-center gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400" size={18} />
          <input 
            autoFocus
            type="text"
            placeholder="Search the Universe..."
            className="w-full bg-kyn-slate-50 dark:bg-kyn-slate-800 py-3 pl-12 pr-4 rounded-2xl border-none focus:ring-2 focus:ring-kyn-green-500 text-sm outline-none transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={onClose} 
          className="p-2 text-kyn-slate-500 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-800 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Filter Chips - UX Guide 7.2: World Selection */}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar bg-kyn-canvas/50 dark:bg-kyn-slate-900">
        {['All', 'Home', 'Lifestyle', 'Tools'].map((w) => (
          <button
            key={w}
            onClick={() => setFilter(w as World | 'All')}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filter === w 
              ? 'bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 shadow-lg' 
              : 'bg-white dark:bg-kyn-slate-800 text-kyn-slate-400 border border-kyn-slate-100 dark:border-kyn-slate-700'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="flex-grow overflow-y-auto p-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <p className="text-[10px] font-black text-kyn-slate-400 uppercase tracking-widest">
            {filtered.length} Results Found
          </p>
        </div>
        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-kyn-slate-50 dark:bg-kyn-slate-800 rounded-full flex items-center justify-center mb-4 text-kyn-slate-300">
              <SearchIcon size={32} />
            </div>
            <p className="italic text-sm text-kyn-slate-400">
              The universe is vast, but we couldn't find that...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
