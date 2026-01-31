"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { World, WORLDS } from "@/lib/supabase/types";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";

interface FilterBarProps {
  currentWorld: World | 'All';
}

/**
 * KYNAR UNIVERSE: Marketplace Filter Bar (v1.5)
 * Role: Tactile navigation and sector orientation.
 * Fix: URL-state synchronization for Next.js 15 compatibility.
 */
export const FilterBar = ({ currentWorld }: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Use the canonical WORLDS constant from your types
  const worlds: (World | 'All')[] = ['All', ...WORLDS];

  // Utility to update URL without full page refresh
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'All' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/store?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push('/store');
    setIsDrawerOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-6 py-4">
        
        {/* Horizontal Quick Chips - Orientation Loop */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
          {worlds.map((w) => (
            <button
              key={w}
              onClick={() => handleFilterChange('world', w)}
              className={`whitespace-nowrap px-5 py-2 font-brand text-[11px] font-medium uppercase tracking-[0.15em] transition-all rounded-full border ${
                currentWorld === w 
                ? "bg-kyn-slate-900 border-kyn-slate-900 text-white shadow-sm" 
                : "bg-white border-border text-kyn-slate-500 hover:border-kyn-slate-300 hover:text-kyn-slate-900"
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-border shrink-0" />

        {/* Master Filter Trigger */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 font-brand text-[11px] font-medium uppercase tracking-[0.15em] text-kyn-slate-500 transition-all hover:border-kyn-slate-300 hover:text-kyn-slate-900"
        >
          <SlidersHorizontal size={14} strokeWidth={2} />
          <span className="hidden sm:inline">Refine</span>
        </button>
      </div>

      {/* Filter Drawer - Designer System Section 11 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-kyn-slate-900/10 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsDrawerOpen(false)}
          />
          
          <div className="relative w-full max-w-sm bg-canvas h-full shadow-2xl p-8 animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-brand text-2xl font-medium tracking-tight text-kyn-slate-900">Refine Collection</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-10">
               {/* Sort Order */}
               <div className="space-y-4">
                 <h3 className="font-brand text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-400">Sort By</h3>
                 <div className="grid gap-2">
                   {[
                     { label: 'Recently Added', val: 'newest' },
                     { label: 'Price: Low to High', val: 'price_asc' },
                     { label: 'Price: High to Low', val: 'price_desc' }
                   ].map((opt) => (
                     <button
                       key={opt.val}
                       onClick={() => handleFilterChange('sort', opt.val)}
                       className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border font-ui text-sm text-kyn-slate-600 hover:border-kyn-slate-900 transition-all"
                     >
                       {opt.label}
                       {searchParams.get('sort') === opt.val && <Check size={14} className="text-kyn-green-600" />}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="font-brand text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-400">Inventory Status</h3>
                 <p className="font-ui text-sm text-kyn-slate-400 leading-relaxed italic">
                   Advanced parameters (File formats and Contextual use-cases) are being harmonized.
                 </p>
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-10 left-8 right-8 flex gap-3">
              <button 
                onClick={clearFilters}
                className="flex flex-1 items-center justify-center gap-2 py-4 font-brand text-sm font-medium border border-border rounded-xl hover:bg-surface transition-all"
              >
                <RotateCcw size={14} />
                Reset
              </button>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="flex-1 py-4 font-brand text-sm font-medium bg-kyn-slate-900 text-white rounded-xl hover:bg-black transition-all active:scale-[0.98]"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
