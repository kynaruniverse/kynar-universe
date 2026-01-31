import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

/**
 * KYNAR UNIVERSE: Marketplace Skeleton
 * Aligned with UX Canon Section 1 (Reassured State)
 * Prevents Layout Shift and provides a "Calm" transition.
 */
export default function StoreLoading() {
  // Matches the 6-item initial load of the Marketplace grid
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="pb-32">
      {/* Handrail preservation during load */}
      <Breadcrumbs paths={[{ label: 'Universe Hub', href: '/store' }]} />
      
      {/* Header Skeleton - Matches /store/page.tsx hierarchy */}
      <div className="px-gutter py-12 md:py-20 space-y-6">
        <div className="h-12 w-48 animate-pulse rounded-kynar bg-surface" />
        <div className="space-y-2">
          <div className="h-5 w-full max-w-lg animate-pulse rounded-md bg-surface/60" />
          <div className="h-5 w-3/4 max-w-md animate-pulse rounded-md bg-surface/40" />
        </div>
      </div>

      {/* Filter Bar Skeleton Placeholder */}
      <div className="h-16 w-full border-y border-border bg-canvas/50" />

      {/* Product Grid Skeleton - Design System Section 5.4 */}
      <div className="grid grid-cols-1 gap-inner px-gutter py-12 sm:grid-cols-2 lg:grid-cols-3">
        {skeletons.map((_, i) => (
          <div key={i} className="flex flex-col space-y-5 rounded-kynar border border-border bg-canvas p-4">
            {/* Aspect Ratio Box */}
            <div className="aspect-[16/10] w-full animate-pulse rounded-lg bg-surface" />
            
            {/* Metadata Skeletons */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-6 w-2/3 animate-pulse rounded bg-surface" />
                <div className="h-6 w-12 animate-pulse rounded bg-surface/80" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-surface/60" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-surface/40" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
