import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductLoading() {
  return (
    <div className="px-4 py-6 pb-24 space-y-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <span className="text-kyn-slate-300">/</span>
        <Skeleton className="h-4 w-20" />
        <span className="text-kyn-slate-300">/</span>
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Hero Section Skeleton */}
      <section className="space-y-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
        
        {/* Preview Skeleton */}
        <Skeleton className="aspect-video w-full rounded-xl" />

        {/* Actions Skeleton */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-14 flex-1 rounded-xl" />
          <Skeleton className="h-14 w-32 rounded-xl" />
        </div>
      </section>
      
      {/* Description Skeleton */}
      <section className="space-y-4 pt-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </section>
    </div>
  );
}