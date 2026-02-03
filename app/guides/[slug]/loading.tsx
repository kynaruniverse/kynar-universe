/**
 * KYNAR UNIVERSE: Guide Briefing Skeleton (v2.0)
 * Role: Editorial Reassured State.
 * Alignment: Next.js 15 Partial Prerendering (PPR) & Canonical Design System.
 */

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function GuideLoading() {
  // Staggered animation utility to prevent a "flashing" wall of content
  const pulseClass = "animate-pulse bg-kyn-slate-100/80";

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

        <header className="py-12 md:py-24">
          {/* Metadata Chips: Category & Time */}
          <div className="flex items-center gap-4 mb-10">
            <div className={cn("h-8 w-24 rounded-full", pulseClass)} />
            <div className={cn("h-4 w-16 rounded-full", pulseClass)} />
          </div>

          {/* Headline Skeleton: Narrative Establishment */}
          <div className="space-y-4 mb-12">
            <div className={cn("h-12 w-full rounded-xl", pulseClass)} />
            <div className={cn("h-12 w-3/4 rounded-xl", pulseClass)} />
          </div>

          {/* Authority Bar: Verified Source Placeholder */}
          <div className="flex items-center gap-5 py-10 border-y border-kyn-slate-50">
            <div className={cn("h-14 w-14 rounded-2xl", pulseClass)} />
            <div className="flex-1 space-y-3">
              <div className={cn("h-4 w-40 rounded", pulseClass)} />
              <div className={cn("h-3 w-28 rounded opacity-50", pulseClass)} />
            </div>
          </div>
        </header>

        {/* Narrative Core Skeleton: Content Blocks */}
        <div className="space-y-12 pt-6">
          <div className="space-y-4">
            <div className={cn("h-4 w-full rounded", pulseClass)} />
            <div className={cn("h-4 w-full rounded", pulseClass)} />
            <div className={cn("h-4 w-11/12 rounded", pulseClass)} />
            <div className={cn("h-4 w-4/5 rounded", pulseClass)} />
          </div>

          {/* Media Placeholder: Hero Asset simulation */}
          <div
            className={cn(
              "aspect-video w-full rounded-[2.5rem] bg-kyn-slate-50 border border-kyn-slate-100/50",
              pulseClass
            )}
          />

          <div className="space-y-4">
            <div className={cn("h-4 w-full rounded", pulseClass)} />
            <div className={cn("h-4 w-full rounded", pulseClass)} />
            <div className={cn("h-4 w-2/3 rounded", pulseClass)} />
          </div>
        </div>
      </div>
    </article>
  );
}
