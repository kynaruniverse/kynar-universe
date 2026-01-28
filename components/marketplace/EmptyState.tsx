"use client";
import React from 'react';
import { SearchX, Home, Heart, Hammer, RefreshCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  onSelectWorld?: (world: 'Home' | 'Lifestyle' | 'Tools') => void;
}

/**
 * EmptyState: The Discovery Guardrail
 * Aligned with Brand Language 1.1: Instills calm and clarity during search failures.
 */
export default function EmptyState({ onReset, onSelectWorld }: EmptyStateProps) {
  return (
    <div className="w-full py-20 px-6 text-center transition-all duration-500 ease-out opacity-100 scale-100">
      
      {/* Visual Icon with Brand Glow (Visual Guide 11.4) */}
      <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-kyn-slate-100 dark:bg-kyn-slate-800 rounded-kyn rotate-6" />
        <div className="absolute inset-0 bg-white dark:bg-kyn-slate-900 border border-kyn-slate-100 dark:border-kyn-slate-800 rounded-kyn flex items-center justify-center shadow-xl">
          <SearchX size={40} className="text-kyn-slate-400" />
        </div>
      </div>

      <h3 className="text-2xl font-black tracking-tighter text-kyn-slate-900 dark:text-white uppercase mb-3 leading-none">
        No results in <br/> this world yet.
      </h3>
      
      <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 font-medium italic mb-10 max-w-[250px] mx-auto leading-relaxed">
        "We're still expanding the universe. Try a different search or jump into a specific world."
      </p>

      {/* Primary Recovery Action: Clear All Filters */}
      <button 
        onClick={onReset}
        className="flex items-center gap-2 mx-auto bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 mb-12 shadow-lg"
      >
        <RefreshCcw size={14} className="animate-spin-slow" />
        Reset Discovery
      </button>

      {/* Secondary Recovery Options: World Shortcuts */}
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto opacity-80">
        <WorldShortcut 
          icon={<Home size={16} />} 
          label="Home" 
          color="bg-kyn-green-500" 
          onClick={() => onSelectWorld?.('Home')}
        />
        <WorldShortcut 
          icon={<Heart size={16} />} 
          label="Lifestyle" 
          color="bg-kyn-caramel-500" 
          onClick={() => onSelectWorld?.('Lifestyle')}
        />
        <WorldShortcut 
          icon={<Hammer size={16} />} 
          label="Tools" 
          color="bg-kyn-slate-500" 
          onClick={() => onSelectWorld?.('Tools')}
        />
      </div>
    </div>
  );
}

function WorldShortcut({ 
  icon, 
  label, 
  color, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  color: string, 
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-2 group outline-none"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-black/5`}>
        {icon}
      </div>
      <span className="text-[9px] font-black uppercase tracking-tighter text-kyn-slate-400 group-hover:text-kyn-slate-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}
