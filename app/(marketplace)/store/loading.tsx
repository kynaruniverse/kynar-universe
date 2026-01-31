/**
 * KYNAR UNIVERSE: Marketplace Skeleton (v1.5)
 * Role: The "Calm" Transition - Eliminating Layout Shift (CLS).
 * Sync: Aligned with v1.5 Typography & Spacing.
 */

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function StoreLoading() {
  // Matches the optimized grid density
  const skeletons = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-canvas pb-32">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Handrail preservation */}
        <Breadcrumbs paths={[{ label: 'Universe Hub', href: '/store' }]} />
        
        {/* Header Skeleton: Matches Page Hierarchy */}
        <header className="py-16 md:py-24 border-b border-border">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
            <div className="h-12 w-64 animate-pulse rounded-xl bg-kyn-slate-100" />
            <div className="space-y-3 w-full flex flex-col items-center">
              <div className="h-4 w-full max-w-lg animate-pulse rounded-full bg-kyn-slate-100/60" />
              <div className="h-4 w-3/4 max-w-md animate-pulse rounded-full bg-kyn-slate-100/40" />
            </div>
          </div>
        </header>

        {/* Filter Bar Skeleton Placeholder */}
        <div className="sticky top-0 z-10 py-8 bg-canvas/80 backdrop-blur-md border-b border-border mb-12">
          <div className="flex gap-3 overflow-hidden">
            <div className="h-9 w-20 animate-pulse rounded-full bg-kyn-slate-100" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-kyn-slate-100" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-kyn-slate-100" />
            <div className="h-9 w-24 animate-pulse rounded-full bg-kyn-slate-100" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skeletons.map((_, i) => (
            <div 
              key={i} 
              className="flex flex-col space-y-6 rounded-2xl border border-border bg-canvas p-6"
            >
              {/* Visual Anchor Box */}
              <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-kyn-slate-100" />
              
              {/* Content Skeletons */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="h-7 w-3/4 animate-pulse rounded-lg bg-kyn-slate-100" />
                  <div className="h-7 w-12 animate-pulse rounded-lg bg-kyn-slate-100/80" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-md bg-kyn-slate-100/60" />
                  <div className="h-4 w-2/3 animate-pulse rounded-md bg-kyn-slate-100/40" />
                </div>
              </div>

              {/* Action Skeleton */}
              <div className="pt-4 mt-auto">
                <div className="h-12 w-full animate-pulse rounded-xl bg-kyn-slate-100/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
