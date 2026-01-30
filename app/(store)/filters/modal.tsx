'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const WORLDS = ['home', 'lifestyle', 'tools'];
const FORMATS = ['Notion Template', 'Mobile PDF', 'Guide', 'Digital Asset'];

export default function FilterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state initialized from URL params
  const [world, setWorld] = useState(searchParams.get('world') || 'all');
  const [format, setFormat] = useState(searchParams.get('format') || 'all');

  if (!isOpen) return null;

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (world !== 'all') params.set('world', world);
    if (format !== 'all') params.set('format', format);
    
    router.push(`/?${params.toString()}`);
    onClose();
  };

  const resetFilters = () => {
    setWorld('all');
    setFormat('all');
    router.push('/');
    onClose();
  };

  const chipStyle = (active: boolean) => `
    px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all
    ${active 
      ? 'bg-kyn-green-700 text-white shadow-md' 
      : 'bg-kyn-slate-100 text-kyn-slate-400 hover:bg-kyn-slate-200'}
  `;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-kyn-green-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-full duration-500">
        <div className="w-12 h-1 bg-kyn-slate-200 rounded-full mx-auto mb-8" />
        
        <header className="mb-8">
          <h2 className="text-xl font-semibold text-kyn-green-700">Refine Search</h2>
          <p className="text-xs text-kyn-slate-500">Focus on the tools you need today.</p>
        </header>

        <div className="space-y-8">
          {/* World Selection */}
          <section>
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-kyn-slate-400 mb-4 block">Select World</label>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setWorld('all')} className={chipStyle(world === 'all')}>All</button>
              {WORLDS.map(w => (
                <button key={w} onClick={() => setWorld(w)} className={chipStyle(world === w)}>
                  {w}
                </button>
              ))}
            </div>
          </section>

          {/* Format Selection */}
          <section>
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-kyn-slate-400 mb-4 block">Asset Format</label>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFormat('all')} className={chipStyle(format === 'all')}>Any</button>
              {FORMATS.map(f => (
                <button key={f} onClick={() => setFormat(f)} className={chipStyle(format === f)}>
                  {f}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="flex gap-3 mt-12">
          <button 
            onClick={resetFilters}
            className="flex-1 py-4 text-[10px] uppercase tracking-widest font-bold text-kyn-slate-400"
          >
            Clear
          </button>
          <button 
            onClick={applyFilters}
            className="flex-[2] bg-kyn-green-700 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-95 transition-all"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
