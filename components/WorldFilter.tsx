'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WORLDS } from '@/lib/constants';

export default function WorldFilter() {
  const searchParams = useSearchParams();
  const currentWorld = searchParams.get('world');
  const query = searchParams.get('q');

  const getLink = (worldName?: string) => {
    const params = new URLSearchParams();
    if (worldName) params.set('world', worldName.toLowerCase());
    if (query) params.set('q', query);
    return `/store?${params.toString()}`;
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      <Link 
        href={getLink()}
        className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${!currentWorld ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-surface text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-800'}`}
      >
        All Dimensions
      </Link>
      
      {WORLDS.map((w) => {
        const isActive = currentWorld === w.toLowerCase();
        return (
          <Link 
            key={w} 
            href={getLink(w)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${isActive ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-surface text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-800'}`}
          >
            {w}
          </Link>
        );
      })}
    </div>
  );
}
