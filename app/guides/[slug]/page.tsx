import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ShopTheGuide } from '@/components/ShopTheGuide';
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

/**
 * SEO Engine for the Universe
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: guide } = await supabase.from('guides').select('title, excerpt').eq('slug', slug).single();
  
  return {
    title: `${guide?.title || 'Guide'} | Kynar Universe`,
    description: guide?.excerpt || 'Deep dive into Kynar systems.',
  };
}

export default async function GuideDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  // 1. Fetch Data from the Source of Truth
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
      {/* Editorial Navigation - Sticky with Calm Blur */}
      <nav className="sticky top-16 z-30 bg-kyn-canvas/80 dark:bg-kyn-slate-900/80 backdrop-blur-xl border-b border-kyn-slate-100 dark:border-kyn-slate-800 px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/guides" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={14} />
            The Archive
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

          <h1 className="text-5xl md:text-6xl font-black leading-[0.9] mb-8 text-kyn-slate-900 dark:text-white uppercase tracking-tighter">
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

        {/* Hero Visual (Visual Guide 11.1) */}
        {guide.cover_image && (
          <div className="mb-16">
            <img 
              src={guide.cover_image} 
              className="w-full aspect-[16/10] rounded-kyn object-cover shadow-kyn-lift" 
              alt={guide.title} 
            />
          </div>
        )}

        {/* Content Area (Editorial Guide 11.2) 
            Uses 'prose' to apply the styles defined in tailwind.config.ts
        */}
        <div className="prose prose-lg dark:prose-invert prose-slate max-w-none mb-24">
          <div 
            className="text-kyn-slate-700 dark:text-kyn-slate-300 leading-[1.8] font-medium"
            dangerouslySetInnerHTML={{ __html: guide.content }} 
          />
        </div>

        {/* Integrated Toolkit (UX Guide 23: Contextual Commerce) */}
        <div className="mt-16 pt-16 border-t border-kyn-slate-100 dark:border-kyn-slate-800">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-kyn-slate-400 mb-8 text-center">Equipment for this Study</h3>
           <ShopTheGuide world={guide.world} />
        </div>

        {/* Brand Sign-off */}
        <footer className="mt-24 p-12 bg-white dark:bg-kyn-slate-900/50 rounded-kyn border border-kyn-slate-100 dark:border-kyn-slate-800 text-center">
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
