/**
 * KYNAR UNIVERSE: Guide Vessel (v1.5)
 * Final Alignment: Next.js 15 + Supabase Inventory Sync
 */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: guide } = await supabase
    .from("guides")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!guide) notFound();

  // Consistent Fallback for the "Noble" Aesthetic
  const displayAuthor = guide.author || "Kynar Universe";

  const breadcrumbPaths = [
    { label: "Hub", href: "/store" },
    { label: "Briefings", href: "/guides" },
    { label: guide.title, href: `/guides/${guide.slug}` }
  ];

  return (
    <article className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-700 ease-out">
      <div className="max-w-screen-md mx-auto px-6">
        <Breadcrumbs paths={breadcrumbPaths} />
        
        <header className="py-12 md:py-20">
          <div className="flex items-center gap-4 mb-8 text-[10px] font-medium uppercase tracking-[0.2em] text-kyn-slate-400">
            <span className="px-3 py-1 rounded-full border border-border bg-surface">
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {guide.read_time_minutes} Min Read
            </span>
          </div>
          
          <h1 className="font-brand text-4xl font-medium text-kyn-slate-900 tracking-tight md:text-6xl mb-10 leading-tight">
            {guide.title}
          </h1>

          <div className="flex items-center gap-4 py-8 border-y border-border">
            <div className="h-12 w-12 rounded-full bg-kyn-slate-100 flex items-center justify-center font-brand text-sm font-medium text-kyn-slate-500 border border-border">
              {displayAuthor[0]}
            </div>
            <div>
              <p className="font-ui text-sm font-medium text-kyn-slate-900">{displayAuthor}</p>
              <p className="font-ui text-xs text-kyn-slate-400">Official Intelligence Briefing</p>
            </div>
          </div>
        </header>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-brand prose-headings:font-medium prose-p:font-ui prose-p:leading-loose text-kyn-slate-600">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>

        <footer className="mt-24 pt-12 border-t border-border">
          <Link href="/store" className="group inline-flex items-center gap-2 text-sm font-medium text-kyn-slate-500 hover:text-kyn-slate-900 transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Hub
          </Link>
        </footer>
      </div>
    </article>
  );
}
