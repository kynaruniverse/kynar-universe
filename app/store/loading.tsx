import { Skeleton } from '@/components/ui/Skeleton';

export default function StoreLoading() {
  return (
    <div className="px-6 py-8 pb-32 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>

      {/* Filter/World Tabs - Matching the rounded-full look */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-11 w-28 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="p-6 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 bg-surface/50 space-y-4"
          >
            {/* World Badge */}
            <Skeleton className="h-5 w-20 rounded-full" />
            
            {/* Title & Description */}
            <div className="space-y-2">
              <Skeleton className="h-7 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
            </div>

            {/* Bottom Info Row */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
