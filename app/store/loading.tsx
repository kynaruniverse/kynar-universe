import { Skeleton } from '@/components/ui/Skeleton';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';

export default function StoreLoading() {
  return (
    <div className="px-6 py-8 pb-32 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>

      {/* Filter/World Tabs */}
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-11 w-28 rounded-2xl flex-shrink-0" />
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}