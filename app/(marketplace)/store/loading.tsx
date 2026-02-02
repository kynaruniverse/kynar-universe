/**
 * KYNAR UNIVERSE: The Hub Loading State (v1.6)
 * Role: A "Calm" bridge that eliminates layout shift (CLS).
 * Design: High-fidelity skeletons matching the ProductCard anatomy.
 */

export default function StoreLoading() {
  const skeletons = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-canvas pb-32">
      {/* Header Skeleton */}
      <header className="py-16 md:py-24 text-center border-b border-border bg-surface/30 px-gutter">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
          <div className="h-10 w-48 md:h-14 md:w-64 animate-pulse rounded-xl bg-kyn-slate-200/60" />
          <div className="space-y-3 w-full flex flex-col items-center px-4">
            <div className="h-3 w-full max-w-lg animate-pulse rounded-full bg-kyn-slate-100" />
            <div className="h-3 w-3/4 max-w-sm animate-pulse rounded-full bg-kyn-slate-100/60" />
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-gutter pt-20">
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {skeletons.map((_, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-[2rem] border border-border bg-white"
            >
              {/* Aspect Ratio Box (16:10) */}
              <div className="aspect-[16/10] w-full animate-pulse bg-kyn-slate-100" />
              
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="h-6 w-2/3 animate-pulse rounded-lg bg-kyn-slate-200/70" />
                    <div className="h-6 w-12 animate-pulse rounded-lg bg-kyn-slate-200/50" />
                  </div>
                  <div className="h-3 w-full animate-pulse rounded-md bg-kyn-slate-100" />
                  <div className="h-3 w-4/5 animate-pulse rounded-md bg-kyn-slate-100/60" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <div className="h-4 w-10 animate-pulse rounded bg-kyn-slate-100" />
                    <div className="h-4 w-10 animate-pulse rounded bg-kyn-slate-100" />
                  </div>
                  <div className="h-8 w-24 animate-pulse rounded-xl bg-kyn-slate-900/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
