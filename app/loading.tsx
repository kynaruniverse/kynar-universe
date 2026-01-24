import { Skeleton } from '@/components/ui/Skeleton';
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton';

export default function HomeLoading() {
  return (
    <div className="px-6 py-8 space-y-16 pb-32 animate-in fade-in duration-700">
      
      {/* 1. Hero Section Skeleton */}
      <section className="text-center space-y-6 pt-12 pb-8">
        <div className="space-y-3">
          {/* Main Title Lines */}
          <Skeleton className="h-10 w-[85%] mx-auto rounded-xl" />
          <Skeleton className="h-10 w-[60%] mx-auto rounded-xl" />
        </div>
        
        {/* Subtitle */}
        <Skeleton className="h-4 w-[50%] mx-auto rounded-lg opacity-60" />
        
        {/* CTA Button */}
        <Skeleton className="h-14 w-44 mx-auto rounded-[1.5rem] mt-4" />
      </section>

      {/* 2. Featured Products Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-6 w-48 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}