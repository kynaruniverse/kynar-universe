/**
 * KYNAR UNIVERSE: Guide Briefing Skeleton (v1.5)
 * Role: Article-specific reassured state.
 * Sync: Matches the Guide Page single-column hierarchy.
 */

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function GuideLoading() {
  return (
    <article className="min-h-screen bg-canvas pb-32">
      <div className="max-w-screen-md mx-auto px-6">
        <Breadcrumbs paths={[{ label: "Briefings", href: "/guides" }]} />
        
        <header className="py-12 md:py-20">
          {/* Metadata Chips */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-6 w-24 animate-pulse rounded-full bg-kyn-slate-100" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-kyn-slate-100/60" />
          </div>
          
          {/* Headline Skeleton */}
          <div className="space-y-4 mb-10">
            <div className="h-12 w-full animate-pulse rounded-xl bg-kyn-slate-100" />
            <div className="h-12 w-2/3 animate-pulse rounded-xl bg-kyn-slate-100/60" />
          </div>

          {/* Author/Intelligence Bar */}
          <div className="flex items-center gap-4 py-8 border-y border-border">
            <div className="h-12 w-12 rounded-full animate-pulse bg-kyn-slate-100" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-kyn-slate-100" />
              <div className="h-3 w-24 animate-pulse rounded bg-kyn-slate-100/60" />
            </div>
          </div>
        </header>

        {/* Narrative Body Skeleton */}
        <div className="space-y-8 pt-4">
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-kyn-slate-100/80" />
            <div className="h-4 w-full animate-pulse rounded bg-kyn-slate-100/80" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-kyn-slate-100/80" />
          </div>
          
          {/* Large Image/Vessel Placeholder */}
          <div className="h-72 w-full animate-pulse rounded-2xl bg-kyn-slate-100/40" />
          
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-kyn-slate-100/80" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-kyn-slate-100/80" />
          </div>
        </div>
      </div>
    </article>
  );
}
