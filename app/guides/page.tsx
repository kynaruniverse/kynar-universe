import { supabase } from '@/lib/supabase';
import { GuideCard } from '@/components/GuideCard';
import { BookOpen, Sparkles, Filter } from 'lucide-react';

export default async function GuidesPage() {
  const { data: guides } = await supabase
    .from('guides')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const featuredGuide = guides?.[0];
  const remainingGuides = guides?.slice(1);

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pb-40">
      {/* Header Section */}
      <header className="px-6 pt-12 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-kyn-slate-900 dark:bg-white rounded-lg text-white dark:text-kyn-slate-900">
            <BookOpen size={16} />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Archive of Wisdom</h2>
        </div>
        
        <h1 className="text-5xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white mb-4 leading-[0.9]">
          The Kynar <br />
          <span className="text-kyn-green-600">Guides.</span>
        </h1>
        
        <p className="text-sm font-medium italic text-kyn-slate-500 dark:text-kyn-slate-400 max-w-sm leading-relaxed">
          "Strategic deep-dives into systems, rituals, and the intentional art of calm living."
        </p>
      </header>

      <main className="px-6 max-w-4xl mx-auto space-y-16">
        
        {/* Featured Spotlight (UX Guide 24) */}
        {featuredGuide && (
          <section className="relative group cursor-pointer">
            <div className="absolute -top-3 left-6 z-10 bg-kyn-green-600 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
              <Sparkles size={10} />
              Latest Insight
            </div>
            <GuideCard guide={featuredGuide} />
          </section>
        )}

        {/* Filter Bar (Visual Consistency with Store) */}
        <div className="flex items-center justify-between border-b border-kyn-slate-100 dark:border-kyn-slate-800 pb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400">
            All Collections
          </span>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-900 dark:text-white">
            <Filter size={14} />
            Filter
          </button>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {remainingGuides?.length ? (
            remainingGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))
          ) : !featuredGuide ? (
            <div className="py-20 text-center col-span-full">
              <p className="text-xs font-bold uppercase tracking-widest text-kyn-slate-300">
                New wisdom is currently being drafted.
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
