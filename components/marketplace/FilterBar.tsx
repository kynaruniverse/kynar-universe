"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { WORLDS, World } from "@/lib/supabase/types";

export const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (key: string, value: World) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/store?${params.toString()}`);
  };

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-canvas/80 px-gutter py-3 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-kyn-slate-900"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <span className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest">
          {searchParams.get('world') || 'All Domains'}
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-canvas animate-in slide-in-from-right duration-500">
          <div className="flex h-16 items-center justify-between px-gutter border-b border-border">
            <h2 className="font-brand font-bold">Refine Results</h2>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 p-8 space-y-8">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400 mb-4">Domains</h3>
              <div className="grid grid-cols-2 gap-3">
                {WORLDS.map(w => (
                  <button key={w} onClick={() => setFilter('world', w)} className="p-3 border border-border rounded-xl text-sm font-ui text-left">{w}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 border-t border-border flex gap-4">
            <button onClick={() => router.push('/store')} className="flex-1 py-4 border border-border rounded-xl"><RotateCcw size={16} className="mx-auto" /></button>
            <button onClick={() => setIsOpen(false)} className="flex-[2] py-4 bg-kyn-slate-900 text-white rounded-xl font-brand font-bold">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};
