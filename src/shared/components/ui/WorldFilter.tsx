'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { WORLDS } from '@/shared/constants/worlds';

/**
 * Internal component that handles the actual filtering logic.
 * Wrapped in Suspense below to prevent Next.js build bail-out.
 */
function FilterContent() {
  const searchParams = useSearchParams();
  const currentWorld = searchParams.get('world');
  const query = searchParams.get('q');

  const getLink = (worldName?: string) => {
    const params = new URLSearchParams();
    // Maintain the search query if it exists
    if (query) params.set('q', query);
    // Set or clear the world filter
    if (worldName) {
      params.set('world', worldName.toLowerCase());
    }
    
    const queryString = params.toString();
    return `/store${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide no-scrollbar">
      <Link 
        href={getLink()}
        className={`
          whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all
          ${!currentWorld 
            ? 'bg-kyn-slate-900 text-white border-kyn-slate-900 dark:bg-white dark:text-kyn-slate-950 shadow-xl' 
            : 'bg-surface text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-800'}
        `}
      >
        All Dimensions
      </Link>
      
      {WORLDS.map((w) => {
        const isActive = currentWorld === w.toLowerCase();
        return (
          <Link 
            key={w} 
            href={getLink(w)}
            className={`
              whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all
              ${isActive 
                ? 'bg-kyn-green-600 text-white border-kyn-green-600 shadow-lg shadow-kyn-green-600/20' 
                : 'bg-surface text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-800'}
            `}
          >
            {w}
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Exported WorldFilter with Suspense Boundary.
 * This is CRITICAL for Next.js 15 builds.
 */
export default function WorldFilter() {
  return (
    <Suspense fallback={<div className="h-12 w-full animate-pulse bg-kyn-slate-50 dark:bg-kyn-slate-900 rounded-2xl" />}>
      <FilterContent />
    </Suspense>
  );
}
