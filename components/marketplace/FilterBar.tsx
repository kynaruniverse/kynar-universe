/* KYNAR UNIVERSE: Filter Bar (v2.1) */

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import { WORLDS } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  currentWorld?: string;
}

export const FilterBar = ({ currentWorld = "All" }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/store?${params.toString()}`);
    setIsOpen(false);
  };

  const resetFilters = () => {
    router.push('/store');
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-kyn-slate-900 transition-opacity hover:opacity-70"
      >
        <SlidersHorizontal size={14} /> Filters
      </button>
      
      <div className="flex items-center gap-2">
        {currentWorld !== "All" && (
          <div className="h-1.5 w-1.5 rounded-full bg-kyn-green-500 animate-pulse" />
        )}
        <span className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest">
          {currentWorld}
        </span>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex flex-col bg-canvas animate-in slide-in-from-right duration-500">
          <div className="flex h-16 items-center justify-between px-gutter border-b border-border">
            <h2 className="font-brand font-bold text-lg">Refine Results</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-6">Domains</h3>
              <div className="grid grid-cols-1 gap-3">
                {/* "All" Option */}
                <button 
                  onClick={() => setFilter('world', 'All')}
                  className={cn(
                    "flex items-center justify-between p-4 border rounded-2xl text-sm font-ui transition-all",
                    currentWorld === "All" 
                      ? "border-kyn-slate-900 bg-kyn-slate-900 text-white" 
                      : "border-border bg-white text-kyn-slate-600 hover:border-kyn-slate-200"
                  )}
                >
                  All Domains
                  {currentWorld === "All" && <Check size={14} />}
                </button>

                {/* World Options */}
                {WORLDS.map((w: string) => (
                  <button 
                    key={w} 
                    onClick={() => setFilter('world', w)}
                    className={cn(
                      "flex items-center justify-between p-4 border rounded-2xl text-sm font-ui transition-all",
                      currentWorld === w 
                        ? "border-kyn-slate-900 bg-kyn-slate-900 text-white" 
                        : "border-border bg-white text-kyn-slate-600 hover:border-kyn-slate-200"
                    )}
                  >
                    {w}
                    {currentWorld === w && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-border bg-surface/50 flex gap-4">
            <button 
              onClick={resetFilters} 
              className="flex-1 py-4 border border-border bg-white rounded-2xl transition-all active:scale-95 flex items-center justify-center"
              title="Reset Filters"
            >
              <RotateCcw size={18} className="text-kyn-slate-400" />
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="flex-[3] py-4 bg-kyn-slate-900 text-white rounded-2xl font-brand text-sm font-bold shadow-lg shadow-kyn-slate-900/10 active:scale-95 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
