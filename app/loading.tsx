import { Skeleton } from '@/components/ui/Skeleton';

export default function HomeLoading() {
  return (
    <div className="px-4 py-6 space-y-12 pb-24">
      {/* Hero Skeleton */}
      <section className="text-center space-y-4 py-8">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-12 w-2/3 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-12 w-40 mx-auto rounded-full" />
      </section>

      {/* Products Skeleton */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
}