'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Suspense } from 'react';

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    // Using { scroll: false } prevents the page from jumping to the top on every keystroke
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 400);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={16} className="text-kyn-slate-400 group-focus-within:text-kyn-green-500 transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search the archive..."
        className="
          w-full bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 
          rounded-2xl py-4 pl-12 pr-4 text-sm font-medium 
          focus:outline-none focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 
          transition-all placeholder:text-kyn-slate-300
        "
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      />
    </div>
  );
}

/**
 * Exported StoreSearch with Suspense Boundary.
 * Essential for Next.js 15 optimization.
 */
export default function StoreSearch() {
  return (
    <Suspense fallback={
      <div className="relative h-14 w-full bg-kyn-slate-50 dark:bg-kyn-slate-900 animate-pulse rounded-2xl border border-transparent" />
    }>
      <SearchInput />
    </Suspense>
  );
}
