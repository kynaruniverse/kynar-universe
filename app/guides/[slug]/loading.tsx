/**
 * KYNAR UNIVERSE: Guide Briefing Skeleton (v3.1)
 * Role: Skeleton placeholder for guide pages
 * Refactor: Unified skeleton primitives, semantic layout
 */

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton, SkeletonText, SkeletonHeading } from "@/components/ui/skeletons";

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

        {/* Header / Hero Skeleton */}
        <header className="py-12 md:py-24">
          {/* Metadata Chips */}
          <div className="flex items-center gap-4 mb-10">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>

          {/* Headline Skeleton */}
          <div className="space-y-4 mb-12">
            <SkeletonHeading className="h-12 w-full" />
            <SkeletonHeading className="h-12 w-3/4" />
          </div>

          {/* Authority / Author Bar */}
          <div className="flex items-center gap-5 py-10 border-y border-kyn-slate-50">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28 opacity-50" />
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <section className="space-y-12 pt-6">
          {/* Text Blocks */}
          <div className="space-y-4">
            <SkeletonText />
            <SkeletonText />
            <SkeletonText className="w-11/12" />
            <SkeletonText className="w-4/5" />
          </div>

          {/* Media / Video Placeholder */}
          <Skeleton className="aspect-video w-full rounded-[2.5rem]" />

          {/* Additional Text */}
          <div className="space-y-4">
            <SkeletonText />
            <SkeletonText />
            <SkeletonText className="w-2/3" />
          </div>
        </section>
      </div>
    </article>
  );
}