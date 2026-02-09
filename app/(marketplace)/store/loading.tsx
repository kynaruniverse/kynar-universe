/**
 * KYNAR UNIVERSE: The Hub Loading State (v2.1)
 * Refactor: Modularized header and product skeletons for clarity.
 */

import { Skeleton, SkeletonProductGrid } from "@/components/ui/skeletons";

// --- Subcomponents ---

const HeaderSkeleton = () => (
  <header className="py-16 md:py-24 text-center border-b border-border bg-surface/30 px-gutter">
    <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
      {/* Main Title Skeleton */}
      <Skeleton className="h-10 w-48 md:h-14 md:w-64 rounded-xl" />
      
      {/* Subtitle / Description Skeletons */}
      <div className="space-y-3 w-full flex flex-col items-center px-4">
        <Skeleton className="h-3 w-full max-w-lg rounded-full" />
        <Skeleton className="h-3 w-3/4 max-w-sm rounded-full opacity-60" />
      </div>
    </div>
  </header>
);

const ProductsSkeleton = () => (
  <div className="max-w-screen-xl mx-auto px-gutter pt-20">
    <SkeletonProductGrid count={6} />
  </div>
);

// --- Main Component ---

export default function StoreLoading() {
  return (
    <main className="min-h-screen bg-canvas pb-32">
      <HeaderSkeleton />
      <ProductsSkeleton />
    </main>
  );
}