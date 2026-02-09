"use client";

/**
 * KYNAR UNIVERSE: Filter Bar
 * Role: Client-side world filtering with mobile drawer.
 */

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import { WORLDS } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  currentWorld ? : string;
}

const ALL = "All";

export const FilterBar = ({ currentWorld = ALL }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const applyFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      value === ALL ? params.delete(key) : params.set(key, value);
      
      router.push(`/store?${params.toString()}`);
      setIsOpen(false);
    },
    [router, searchParams]
  );
  
  const resetFilters = useCallback(() => {
    router.push("/store");
    setIsOpen(false);
  }, [router]);
  
  return (
    <div className="flex items-center justify-between">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-kyn-slate-900 hover:opacity-70 transition-opacity"
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>

      {/* Active State */}
      <div className="flex items-center gap-2">
        {currentWorld !== ALL && (
          <span className="h-1.5 w-1.5 rounded-full bg-kyn-green-500 animate-pulse" />
        )}
        <span className="text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
          {currentWorld}
        </span>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <aside className="fixed inset-0 z-[120] flex flex-col bg-canvas animate-in slide-in-from-right duration-500">
          {/* Header */}
          <header className="flex h-16 items-center justify-between px-gutter border-b border-border">
            <h2 className="font-brand text-lg font-bold">Refine Results</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
          </header>

          {/* Content */}
          <section className="flex-1 overflow-y-auto p-8 space-y-8">
            <div>
              <h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                Domains
              </h3>

              <div className="grid gap-3">
                <FilterOption
                  label="All Domains"
                  active={currentWorld === ALL}
                  onClick={() => applyFilter("world", ALL)}
                />

                {WORLDS.map((world) => (
                  <FilterOption
                    key={world.id}
                    label={world.name}
                    active={currentWorld === world.id}
                    onClick={() => applyFilter("world", world.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex gap-4 p-8 border-t border-border bg-surface/50">
            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="flex-1 flex items-center justify-center rounded-2xl border border-border bg-white py-4 active:scale-95 transition-all"
            >
              <RotateCcw size={18} className="text-kyn-slate-400" />
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="flex-[3] rounded-2xl bg-kyn-slate-900 py-4 font-brand text-sm font-bold text-white shadow-lg shadow-kyn-slate-900/10 active:scale-95 transition-all"
            >
              Close
            </button>
          </footer>
        </aside>
      )}
    </div>
  );
};

/* ---------- Subcomponents ---------- */

interface FilterOptionProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterOption({ label, active, onClick }: FilterOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-2xl border p-4 text-sm font-ui transition-all",
        active
          ? "border-kyn-slate-900 bg-kyn-slate-900 text-white"
          : "border-border bg-white text-kyn-slate-600 hover:border-kyn-slate-200"
      )}
    >
      {label}
      {active && <Check size={14} />}
    </button>
  );
}