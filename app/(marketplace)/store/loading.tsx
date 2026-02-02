/**
 * KYNAR UNIVERSE: The Hub Loading State (v1.5)
 * Role: A "Calm" bridge that eliminates layout shift (CLS).
 * Design: High-fidelity skeletons matching the ProductCard anatomy.
 */

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function StoreLoading() {
  // 6 Skeletons to fill the viewport on most mobile/tablet screens
  const skeletons = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-canvas pb-32">
      <div className="max-w-screen-xl mx-auto px-gutter">
        {/* 1. Handrail Preservation */}
        <div className="pt-8">
          <Breadcrumbs paths={[{ label: 'The Hub', href: '/store' }]} />
        </div>
        
        {/* 2. Header Skeleton: Aligned with Store Page typography */}
        <header className="py-16 md:py-24 text-center border-b border-border bg-surface/30 -mx-gutter px-gutter">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
            <div className="h-10 w-48 md:h-14 md:w-64 animate-pulse rounded-xl bg-kyn-slate-200/60" />
            <div className="space-y-3 w-full flex flex-col items-center px-4">
              <div className="h-3 w-full max-w-lg animate-pulse rounded-full bg-kyn-slate-100" />
              <div className="h-3 w-3/4 max-w-md animate-pulse rounded-full bg-kyn-slate-100/80" />
            </div>
          </div>
        </header>

        {/* 3. Filter Bar Skeleton (Sticky Mock) */}
        <div className="sticky top-0 z-30 py-6 bg-canvas/90 backdrop-blur-md mb-8 border-b border-border/50">
          <div className="flex items-center justify-between gap-4">
             <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-20 shrink-0 animate-pulse rounded-full bg-kyn-slate-100" />
                ))}
             </div>
             <div className="h-9 w-24 animate-pulse rounded-full bg-kyn-slate-100" />
          </div>
        </div>

        {/* 4. Product Grid Skeleton */}
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {skeletons.map((_, i) => (
            <div 
              key={i} 
              className="group flex flex-col bg-white border border-border rounded-3xl overflow-hidden shadow-kynar-soft"
            >
              {/* Visual Anchor Box (16:10 aspect ratio matching ProductCard) */}
              <div className="aspect-[16/10] w-full animate-pulse bg-kyn-slate-100 will-change-opacity" />
              
              {/* Content Skeletons */}
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="h-6 w-3/4 animate-pulse rounded-lg bg-kyn-slate-200/70" />
                    <div className="h-6 w-12 animate-pulse rounded-lg bg-kyn-slate-200/50" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full animate-pulse rounded-md bg-kyn-slate-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded-md bg-kyn-slate-100/60" />
                  </div>
                </div>

                {/* Footer Metadata Skeleton */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <div className="h-4 w-8 animate-pulse rounded bg-kyn-slate-100" />
                    <div className="h-4 w-8 animate-pulse rounded bg-kyn-slate-100" />
                  </div>
                  <div className="h-4 w-16 animate-pulse rounded bg-kyn-slate-100/80" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
