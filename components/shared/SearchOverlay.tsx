"use client";
import React from 'react';
import { X, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../ProductCard';

export const SearchOverlay = ({ isOpen, onClose, products }: any) => {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('All');

  if (!isOpen) return null;

  const filtered = products.filter((p: any) => 
    (filter === 'All' || p.world === filter) && 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[60] bg-white dark:bg-kyn-slate-900 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Search Header */}
      <div className="p-6 border-b border-kyn-slate-100 dark:border-kyn-slate-800 flex items-center gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-400" size={18} />
          <input 
            autoFocus
            type="text"
            placeholder="Search the Universe..."
            className="w-full bg-kyn-slate-50 dark:bg-kyn-slate-800 py-3 pl-12 pr-4 rounded-2xl border-none focus:ring-2 focus:ring-kyn-green-500 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button onClick={onClose} className="p-2 text-kyn-slate-500">
          <X size={24} />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
        {['All', 'Home', 'Lifestyle', 'Tools'].map((w) => (
          <button
            key={w}
            onClick={() => setFilter(w)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              filter === w 
              ? 'bg-kyn-slate-900 text-white shadow-lg' 
              : 'bg-kyn-slate-50 text-kyn-slate-400'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="flex-grow overflow-y-auto p-6 pb-20">
        <p className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest mb-4">
          {filtered.length} Results Found
        </p>
        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 italic text-kyn-slate-400">
            No items match your search...
          </div>
        )}
      </div>
    </div>
  );
};
