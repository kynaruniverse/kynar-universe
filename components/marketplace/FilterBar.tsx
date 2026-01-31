"use client";

import { useState } from "react";
import { World } from "@/types/supabase";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";

interface FilterBarProps {
  currentWorld: World | 'All';
  onWorldChange: (world: World | 'All') => void;
}

/**
 * KYNAR UNIVERSE: Marketplace Filter Bar
 * Aligned with UX Canon Section 2 (Orientation)
 * Provides tactile, horizontal world switching and deep filtering.
 */
export const FilterBar = ({ currentWorld, onWorldChange }: FilterBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const worlds: (World | 'All')[] = ['All', 'Home', 'Lifestyle', 'Tools'];

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-gutter py-4">
        
        {/* Horizontal Quick Chips - UX Canon 2.1 */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
          {worlds.map((w) => (
            <button
              key={w}
              onClick={() => onWorldChange(w)}
              className={`whitespace-nowrap px-5 py-2 font-brand text-xs font-bold uppercase tracking-widest calm-transition rounded-full border ${
                currentWorld === w 
                ? "bg-kyn-slate-900 border-kyn-slate-900 text-white shadow-kynar-soft" 
                : "bg-white border-border text-kyn-slate-500 hover:border-kyn-slate-300 hover:text-kyn-slate-900"
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Structural Divider */}
        <div className="h-6 w-px bg-border shrink-0" />

        {/* Master Filter Trigger */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-500 calm-transition hover:border-kyn-slate-300 hover:text-kyn-slate-900"
        >
          <SlidersHorizontal size={14} strokeWidth={2.5} />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filter Drawer - Design System Section 11 (Motion) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-kyn-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsDrawerOpen(false)}
          />
          
          <div className="relative w-full max-w-sm bg-canvas h-full shadow-2xl p-8 animate-in slide-in-from-right duration-500 ease-kyn-out">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900">Filters</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 calm-transition"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-10">
               {/* Metadata / Category Placeholder */}
               <div className="space-y-4">
                 <h3 className="font-brand text-xs font-bold uppercase tracking-[0.2em] text-kyn-slate-400">Refine Search</h3>
                 <p className="font-ui text-sm text-text-secondary leading-relaxed italic">
                   Extended parameters (Price range, File formats, and Contextual use-cases) are being harmonized.
                 </p>
               </div>
            </div>

            {/* Bottom Actions - UX Canon Section 5 */}
            <div className="absolute bottom-10 left-8 right-8 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 py-4 font-brand text-sm font-bold border border-border rounded-kynar hover:bg-surface calm-transition">
                <RotateCcw size={14} />
                Clear
              </button>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="flex-1 py-4 font-brand text-sm font-bold bg-kyn-slate-900 text-white rounded-kynar hover:bg-kyn-slate-800 shadow-kynar-soft calm-transition active:scale-[0.98]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
