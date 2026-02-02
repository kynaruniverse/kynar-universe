/**
 * KYNAR UNIVERSE: Guide Briefing Skeleton (v1.6)
 * Role: Editorial Reassured State.
 * Optimization: Staggered pulses for mobile-first atmospheric loading.
 * Sync: Next.js 15 Partial Prerendering (PPR) Compatible.
 */

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { cn, transitions } from "@/lib/utils";

export default function GuideLoading() {
  return (
    <article className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-500 ease-out">
      <div className="max-w-screen-md mx-auto px-gutter">
        {/* Navigation Handrail */}
        <div className="py-6">
          <Breadcrumbs
            paths={[
              { label: "Universe", href: "/" },
              { label: "Briefings", href: "/guides" },
            ]}
          />
        </div>

        <header className="py-12 md:py-20">
          {/* Metadata Chips */}
          <div className="flex items-center gap-4 mb-10">
            <div className={cn("h-6 w-24 rounded-full bg-kyn-slate-100", transitions.breathe)} />
            <div className={cn("h-6 w-16 rounded-full bg-kyn-slate-100/60", transitions.breathe)} />
          </div>

          {/* Headline Skeleton */}
          <div className="space-y-4 mb-12">
            <div className={cn("h-10 w-full rounded-xl bg-kyn-slate-100", transitions.breathe)} />
            <div className={cn("h-10 w-3/4 rounded-xl bg-kyn-slate-100/60", transitions.breathe)} />
          </div>

          {/* Authority Bar */}
          <div className="flex items-center gap-5 py-10 border-y border-kyn-slate-50">
            <div className={cn("h-14 w-14 rounded-2xl bg-kyn-slate-100", transitions.breathe)} />
            <div className="flex-1 space-y-3">
              <div className={cn("h-4 w-40 rounded bg-kyn-slate-100", transitions.breathe)} />
              <div className={cn("h-3 w-28 rounded bg-kyn-slate-100/40", transitions.breathe)} />
            </div>
          </div>
        </header>

        {/* Narrative Core Skeleton */}
        <div className="space-y-10 pt-6">
          <div className="space-y-4">
            <div className={cn("h-4 w-full rounded bg-kyn-slate-100/80", transitions.breathe)} />
            <div className={cn("h-4 w-full rounded bg-kyn-slate-100/80", transitions.breathe)} />
            <div className={cn("h-4 w-11/12 rounded bg-kyn-slate-100/80", transitions.breathe)} />
            <div className={cn("h-4 w-4/5 rounded bg-kyn-slate-100/80", transitions.breathe)} />
          </div>

          {/* Media Placeholder */}
          <div
            className={cn(
              "aspect-video w-full rounded-[2rem] bg-kyn-slate-50 border border-kyn-slate-100/50",
              transitions.breathe
            )}
          />

          <div className="space-y-4">
            <div className={cn("h-4 w-full rounded bg-kyn-slate-100/80", transitions.breathe)} />
            <div className={cn("h-4 w-full rounded bg-kyn-slate-100/80", transitions.breathe)} />
            <div className={cn("h-4 w-2/3 rounded bg-kyn-slate-100/80", transitions.breathe)} />
          </div>
        </div>
      </div>
    </article>
  );
}