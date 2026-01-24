import { Skeleton } from './Skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="p-6 rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-800 bg-surface/50 space-y-5 shadow-sm">
      
      {/* 1. World & Category Badge */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <div className="w-1 h-1 rounded-full bg-kyn-slate-100 dark:bg-kyn-slate-800" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      
      <div className="space-y-4">
        {/* 2. Title - Slightly taller to match 'font-black' height */}
        <Skeleton className="h-8 w-[90%] rounded-xl" />
        
        {/* 3. Description Lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-[75%] rounded-full" />
        </div>
      </div>

      {/* 4. Visual Asset Placeholder (Optional) 
          If your cards have preview images, uncomment this:
          <Skeleton className="aspect-video w-full rounded-[1.5rem]" /> 
      */}

      {/* 5. Footer Row */}
      <div className="flex items-center justify-between pt-6 border-t border-kyn-slate-50 dark:border-kyn-slate-800/50">
        <div className="space-y-1">
          <Skeleton className="h-3 w-10 rounded-full opacity-50" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
        
        {/* The Action Button */}
        <Skeleton className="h-12 w-32 rounded-2xl" />
      </div>
    </div>
  );
}
