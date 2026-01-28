import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ShopTheGuide } from '@/components/ShopTheGuide';
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default async function GuideDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // 1. Fetch Data
  const { data: guide } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!guide) notFound();

  const publishDate = new Date(guide.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pb-40">
      {/* Editorial Navigation */}
      <nav className="sticky top-16 z-30 bg-kyn-canvas/80 dark:bg-kyn-slate-900/80 backdrop-blur-xl border-b border-kyn-slate-100 dark:border-kyn-slate-800 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/guides" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Back to Library
          </Link>
          <button className="text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </nav>

      <div className="px-6 pt-16 max-w-2xl mx-auto">
        {/* Header Section (Brand Strategy 3.1) */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-600 text-[9px] font-black uppercase tracking-[0.2em] border border-kyn-green-100 dark:border-kyn-green-800">
              {guide.world} World
            </span>
            <div className="h-px w-8 bg-kyn-slate-200 dark:bg-kyn-slate-700" />
            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-kyn-slate-400">
              <Clock size={12} className="opacity-70" /> {guide.reading_time_minutes}m Study
            </span>
          </div>

          <h1 className="text-5xl font-black leading-[0.95] mb-8 text-kyn-slate-900 dark:text-white uppercase tracking-tighter">
            {guide.title}
          </h1>

          <p className="text-xl font-medium italic text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed mb-8 border-l-4 border-kyn-green-500 pl-6">
            {guide.excerpt}
          </p>

          <div className="flex items-center gap-3 text-kyn-slate-400 text-[10px] font-black uppercase tracking-widest">
             <Calendar size={12} strokeWidth={3} />
             <span>Documented {publishDate}</span>
          </div>
        </header>

        {/* Hero Visual */}
        {guide.cover_image && (
          <div className="mb-16">
            <img 
              src={guide.cover_image} 
              className="w-full aspect-[16/10] rounded-[2.5rem] object-cover shadow-kyn-lift" 
              alt={guide.title} 
            />
          </div>
        )}

        {/* Content Area (Editorial Guide 11.2) */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-kyn-slate-700 dark:text-kyn-slate-300 leading-[1.8] text-lg font-medium">
            {guide.content}
          </div>
        </div>

        {/* Integrated Toolkit (UX Guide 23) */}
        <ShopTheGuide world={guide.world} />

        {/* Brand Sign-off */}
        <footer className="mt-24 p-12 bg-white dark:bg-kyn-slate-800 rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-700 text-center">
          <div className="w-12 h-12 bg-kyn-slate-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
             <div className="w-2 h-2 rounded-full bg-kyn-green-500 animate-pulse" />
          </div>
          <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 italic leading-relaxed max-w-sm mx-auto">
            "We believe the systems you use dictate the quality of the life you live. Build yours with intention."
          </p>
        </footer>
      </div>
    </article>
  );
}
