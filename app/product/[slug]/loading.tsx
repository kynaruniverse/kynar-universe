import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductLoading() {
  return (
    <div className="min-h-screen px-4 py-6 pb-24 space-y-8 animate-in fade-in duration-500">
      
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 px-1">
        <Skeleton className="h-3 w-10" />
        <div className="h-1 w-1 rounded-full bg-kyn-slate-200" />
        <Skeleton className="h-3 w-16" />
        <div className="h-1 w-1 rounded-full bg-kyn-slate-200" />
        <Skeleton className="h-3 w-24" />
      </div>

      {/* Hero Media Skeleton - Matching the 2rem/32px rounding of the real page */}
      <section>
        <Skeleton className="aspect-[4/3] w-full rounded-[2rem]" />
      </section>

      {/* Product Info Skeleton */}
      <section className="px-2 space-y-6">
        <div className="space-y-3">
          {/* Badge */}
          <Skeleton className="h-5 w-20 rounded-full" />
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
          </div>
          {/* Short Description */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Actions Bar Skeleton */}
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-14 flex-1 rounded-2xl" />
          <Skeleton className="h-14 w-28 rounded-2xl" />
        </div>
      </section>
      
      {/* Details Skeleton */}
      <section className="px-2 space-y-4 pt-10 border-t border-kyn-slate-100 dark:border-kyn-slate-800">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </section>
    </div>
  );
}
