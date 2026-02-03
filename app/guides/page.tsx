/**
 * KYNAR UNIVERSE: Briefings Archive (v1.6)
 * Role: Central repository for all world intelligence.
 * Fully aligned with canonical types.ts and Next.js 15.
 */

import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Compass, Clock, ArrowRight } from "lucide-react";
import { Guide } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Briefings | Kynar Universe Intelligence",
  description: "Explore the technical and narrative architecture of the Kynar Universe.",
};

export default async function GuidesPage() {
  const supabase = await createClient();
  
  /**
   * Data Retrieval: Server-Side
   * Using explicit casting to Guide[] for alignment with types.ts
   */
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("is_published", true) // Ensuring only public intelligence is visible
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("[Briefings] Fetch failure:", error.message);
  }
  
  const guides = (data as Guide[]) ?? [];
  
  const breadcrumbPaths = [
    { label: "Universe", href: "/" },
    { label: "Briefings", href: "/guides" },
  ];
  
  return (
    <main className="min-h-screen bg-canvas pb-32">
      {/* Handrail: Navigation */}
      <nav className="border-b border-kyn-slate-50 bg-white/50 backdrop-blur-md px-gutter">
        <div className="mx-auto max-w-screen-xl flex h-14 items-center">
          <Breadcrumbs paths={breadcrumbPaths} />
        </div>
      </nav>

      <section className="mx-auto max-w-screen-xl px-gutter pt-12 md:pt-20">
        {/* Header: Narrative Context */}
        <header className="max-w-screen-md mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-brand text-4xl font-bold tracking-tight text-kyn-slate-900 md:text-6xl">
            Intelligence Briefings
          </h1>
          <p className="mt-6 font-ui text-base leading-relaxed text-text-secondary md:text-lg">
            A collection of technical frameworks, world-building records, and operational guides designed to ground your digital experience.
          </p>
        </header>

        {/* The Archive Grid */}
        {guides.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Visual Anchor */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-surface border border-kyn-slate-100 transition-all duration-500 group-hover:shadow-kynar-soft group-hover:border-kyn-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-kyn-slate-50 to-white text-kyn-slate-200">
                    <Compass
                      size={48}
                      strokeWidth={1}
                      className="transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
                    />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-kyn-slate-900 shadow-sm">
                    {guide.category}
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="mt-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-kyn-green-600" />
                      {guide.read_time_minutes ?? 5} Min Read
                    </span>
                    <span>•</span>
                    <span>
                      {guide.created_at 
                        ? new Date(guide.created_at).toLocaleDateString("en-GB", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Recent"}
                    </span>
                  </div>

                  <h3 className="mt-3 font-brand text-xl font-bold text-kyn-slate-900 group-hover:text-black transition-colors">
                    {guide.title}
                  </h3>

                  <p className="mt-3 font-ui text-sm leading-relaxed text-text-secondary line-clamp-2">
                    {guide.excerpt ??
                      "Technical briefing and narrative exploration regarding this sector of the Kynar Universe."}
                  </p>

                  <div className="mt-auto pt-6 flex items-center gap-2 font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-900">
                    Explore Briefing
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Reassured Empty State */
          <div className="rounded-[2.5rem] bg-surface border border-dashed border-kyn-slate-200 py-32 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-kyn-slate-50 text-kyn-slate-300">
              <Compass size={32} />
            </div>
            <p className="mt-6 font-brand text-sm font-bold text-kyn-slate-900">
              Archive Currently Indexing
            </p>
            <p className="mt-2 font-ui text-xs text-kyn-slate-400">
              Briefings will appear here as they are cleared for release.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
