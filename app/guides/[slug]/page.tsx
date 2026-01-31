import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  
  const { data: guide } = await supabase
    .from("guides")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!guide) notFound();

  const breadcrumbPaths = [
    { label: "Library", href: "/library" },
    { label: "Guides", href: "/guides" },
    { label: guide.title, href: `/guides/${guide.slug}` }
  ];

  return (
    <article className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-1000">
      <div className="max-w-screen-md mx-auto px-6">
        <Breadcrumbs paths={breadcrumbPaths} />
        
        <header className="py-12 md:py-20">
          <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
            <span className="px-2 py-0.5 rounded border border-kyn-slate-100 bg-surface">
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {guide.read_time_minutes} Min Read
            </span>
          </div>
          
          <h1 className="font-brand text-4xl font-bold text-text-primary tracking-tight md:text-6xl mb-8">
            {guide.title}
          </h1>

          <div className="flex items-center gap-3 py-6 border-y border-kyn-slate-50">
            <div className="h-8 w-8 rounded-full bg-kyn-slate-100 flex items-center justify-center font-brand text-xs font-bold text-text-secondary">
              {guide.author[0]}
            </div>
            <div className="text-xs">
              <p className="font-bold text-text-primary">{guide.author}</p>
              <p className="text-text-secondary">Kynar Curated Guide</p>
            </div>
          </div>
        </header>

        {/* Content Layer: Narrative Depth */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-brand prose-headings:font-bold prose-p:font-ui prose-p:leading-loose text-text-secondary">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>

        <footer className="mt-20 pt-12 border-t border-kyn-slate-100">
          <Link href="/library" className="inline-flex items-center gap-2 text-sm font-bold text-text-primary hover:gap-4 transition-all">
            <ArrowLeft size={16} />
            Return to Library
          </Link>
        </footer>
      </div>
    </article>
  );
}
