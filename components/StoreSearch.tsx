'use client';

import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function StoreSearch() {
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
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={16} className="text-kyn-slate-400 group-focus-within:text-kyn-green-500 transition-colors" />
      </div>
      <input
        type="text"
        placeholder="Search the archive..."
        className="w-full bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 transition-all placeholder:text-kyn-slate-300"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      />
    </div>
  );
}
