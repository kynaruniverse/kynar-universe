import { supabase } from '@/lib/supabase';
import { GuideCard } from '@/components/GuideCard';
import { BookOpen, Sparkles, Filter } from 'lucide-react';
import { Guide } from '@/types/index';

/**
 * GuidesPage: The Archive of Wisdom
 * Server-side fetching for maximum SEO and performance.
 */
export default async function GuidesPage() {
  // Fetch guides from the 'guides' table
  // Note: Ensure 'is_published' column exists in your Supabase schema
  const { data: guides, error } = await supabase
    .from('guides')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error("Kynar Archive Error:", error.message);
  }

  const typedGuides = (guides as Guide[]) || [];
  const featuredGuide = typedGuides[0];
  const remainingGuides = typedGuides.slice(1);

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pb-40 pt-24 md:pt-32">
      <header className="px-6 pb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-kyn-slate-900 dark:bg-white rounded-xl text-white dark:text-kyn-slate-900 shadow-kyn-lift">
            <BookOpen size={16} />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.35em] text-kyn-slate-400">Archive of Wisdom</h2>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white mb-6 leading-[0.85]">
          The Kynar <br />
          <span className="text-kyn-green-600">Guides.</span>
        </h1>
        
        <p className="text-sm md:text-base font-medium italic text-kyn-slate-500 dark:text-kyn-slate-400 max-w-md leading-relaxed">
          "Strategic deep-dives into systems, rituals, and the intentional art of calm living."
        </p>
      </header>

      <main className="px-6 max-w-4xl mx-auto space-y-20">
        
        {/* Featured Spotlight */}
        {featuredGuide ? (
          <section className="relative group">
            <div className="absolute -top-3 left-6 z-10 bg-kyn-green-600 text-white text-[8px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
              <Sparkles size={10} className="animate-pulse" />
              Latest Insight
            </div>
            <GuideCard guide={featuredGuide} isFeatured={true} />
          </section>
        ) : null}

        {/* Collection Control Bar */}
        <div className="flex items-center justify-between border-b border-kyn-slate-100 dark:border-kyn-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-900 dark:text-white">
              All Collections
            </span>
            <span className="text-[10px] font-bold text-kyn-slate-300 dark:text-kyn-slate-600">/</span>
            <span className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest">
              {typedGuides.length} Entries
            </span>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-kyn-green-600 transition-colors">
            <Filter size={14} />
            Sort by World
          </button>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {remainingGuides.length > 0 ? (
            remainingGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))
          ) : !featuredGuide ? (
            <div className="py-32 text-center col-span-full border-2 border-dashed border-kyn-slate-100 dark:border-kyn-slate-800 rounded-[2.5rem]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-300">
                New wisdom is currently being drafted.
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
