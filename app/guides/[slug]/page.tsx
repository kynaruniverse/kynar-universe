/**
 * KYNAR UNIVERSE: Guide Vessel (v1.6)
 * Role: Premium intelligence briefing.
 * Optimization: Next.js 15 Async, Mobile-First Readability, PPR Ready.
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReadingProgressBar } from "@/components/guides/ReadingProgressBar";
import { Clock, ArrowLeft, ShieldCheck, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

// Build-safe interface
interface Guide {
  title: string;
  slug: string;
  category: string;
  content: string;
  author?: string;
  read_time_minutes?: number;
  created_at: string;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: guide } = await supabase.from("guides").select("title").eq("slug", slug).single();

  if (!guide) return { title: "Briefing Not Found" };

  return {
    title: `${guide.title} | Kynar Intelligence`,
    description: "Official intelligence briefing from the Kynar Universe archive.",
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  // 1. Next.js 15 Standard: Await dynamic params
  const { slug } = await params;
  const supabase = await createClient();
  
  // 2. Data Acquisition from the Vault
  const { data } = await supabase
    .from("guides")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) notFound();
  const guide = data as Guide;

  const displayAuthor = guide.author || "Kynar Universe";

  const breadcrumbPaths = [
    { label: "Universe", href: "/" },
    { label: "Briefings", href: "/guides" },
    { label: guide.title, href: `/guides/${guide.slug}`, colorClass: "text-kyn-slate-900" }
  ];

  return (
    <main className="min-h-screen bg-canvas pb-32 selection:bg-kyn-green-100/50">
      {/* Handrail: Mobile-optimized orientation */}
      <nav className="sticky top-0 z-40 border-b border-kyn-slate-50 bg-canvas/80 backdrop-blur-xl px-gutter">
        <div className="mx-auto max-w-screen-md flex h-14 items-center justify-between">
          <Breadcrumbs paths={breadcrumbPaths} />
          <button className="text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors p-2 -mr-2">
            <Share2 size={18} />
          </button>
        </div>
      </nav>

      <article className="mx-auto max-w-screen-md px-gutter animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-kyn-out">
        
        {/* Header: Meta Intelligence */}
        <header className="py-12 md:py-24">
          <div className="flex items-center gap-4 mb-10 text-[10px] font-bold uppercase tracking-[0.25em] text-kyn-slate-400">
            <span className="rounded-full border border-kyn-slate-100 bg-white px-3.5 py-2 text-kyn-slate-900 shadow-sm">
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-kyn-green-600" />
              {guide.read_time_minutes || 5} Min Read
            </span>
          </div>
          
          <h1 className="font-brand text-4xl font-bold tracking-tight text-kyn-slate-900 md:text-6xl lg:text-7xl leading-[1.05]">
            {guide.title}
          </h1>

          {/* Authority Anchor */}
          <div className="mt-12 flex items-center gap-5 border-y border-kyn-slate-50 py-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-kyn-slate-900 font-brand text-lg font-bold text-white shadow-xl">
              {displayAuthor[0]}
            </div>
            <div>
              <p className="font-brand text-sm font-bold uppercase tracking-wider text-kyn-slate-900">
                {displayAuthor}
              </p>
              <div className="mt-1 flex items-center gap-2 font-ui text-xs text-kyn-slate-400">
                <ShieldCheck size={14} className="text-kyn-green-600" />
                <span>Verified Intelligence Source</span>
              </div>
            </div>
          </div>
        </header>

        {/* Narrative Core: Optimized for readability */}
        <section className="prose prose-slate prose-base md:prose-lg max-w-none 
          prose-headings:font-brand prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-kyn-slate-900
          prose-p:font-ui prose-p:leading-[1.8] prose-p:text-text-secondary prose-p:mb-8
          prose-strong:text-kyn-slate-900 prose-a:text-kyn-green-700 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-kyn-slate-100
          prose-blockquote:border-l-kyn-green-500 prose-blockquote:bg-kyn-slate-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </section>

        {/* Narrative Exit */}
        <footer className="mt-32 rounded-[2.5rem] bg-surface border border-kyn-slate-100 p-10 md:p-16 text-center">
          <div className="mb-10 flex justify-center">
            <div className="h-1.5 w-12 rounded-full bg-kyn-slate-200/50" />
          </div>
          <blockquote className="font-brand text-xl md:text-2xl font-medium text-kyn-slate-900 mb-12 italic leading-relaxed">
            "True professional mastery begins with the acquisition of quiet knowledge."
          </blockquote>
          <Link 
            href="/store" 
            className="group inline-flex items-center gap-3 rounded-2xl bg-kyn-slate-900 px-10 py-5 font-brand text-sm font-bold text-white transition-all active:scale-[0.97] shadow-xl hover:bg-black"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Return to Hub
          </Link>
        </footer>
      </article>

      {/* Persistent Progress Bridge */}
      <ReadingProgressBar />
    </main>
  );
}
