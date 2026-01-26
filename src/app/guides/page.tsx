import { ArrowRight, Lightbulb, Star, Zap, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides & Hub | Kynar Universe',
  description: 'Tutorials, tips, and deep dives to help you organise your digital life.',
};

export default function GuidesPage() {
  const guides = [
    {
      id: 1,
      title: "How to organise your week in 5 minutes",
      category: "Productivity",
      excerpt: "Stop over-planning. Here is the simple 3-step method to clear your head every Sunday night.",
      icon: Zap,
      color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
      date: "Oct 12, 2025"
    },
    {
      id: 2,
      title: "Setting up your Creator Dashboard",
      category: "Tutorials",
      excerpt: "A step-by-step walkthrough of the Ultimate Creator Pack. Learn how to track sponsors and scripts.",
      icon: Star,
      color: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
      date: "Oct 15, 2025"
    },
    {
      id: 3,
      title: "Why digital decluttering matters",
      category: "Wellness",
      excerpt: "A messy desktop equals a messy mind. Science-backed reasons to clean up your files today.",
      icon: Lightbulb,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
      date: "Oct 20, 2025"
    }
  ];

  return (
    <div className="px-4 py-6 pb-24 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-primary">
          The Hub
        </h1>
        <p className="text-kyn-slate-500 text-sm">
          Guides, tutorials, and inspiration.
        </p>
      </div>

      {/* Categories - Matching StorePage styling */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {['Latest', 'Usage Guides', 'Creator Tips'].map((cat, i) => (
          <button 
            key={cat}
            className={`
              px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap border transition-all
              ${i === 0 
                ? 'bg-kyn-slate-900 text-white border-kyn-slate-900 dark:bg-white dark:text-kyn-slate-900 shadow-md' 
                : 'bg-surface border-kyn-slate-200 dark:border-kyn-slate-700 text-kyn-slate-500 hover:border-kyn-slate-400'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article List */}
      <div className="grid gap-4">
        {guides.map((guide) => (
          <article 
            key={guide.id}
            className="
              bg-surface p-5 rounded-2xl 
              border border-kyn-slate-200 dark:border-kyn-slate-800 
              hover:border-kyn-green-400 dark:hover:border-kyn-green-600 
              transition-all group cursor-pointer shadow-sm hover:shadow-md
            "
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2.5 rounded-xl ${guide.color}`}>
                <guide.icon size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-kyn-slate-400 bg-kyn-slate-100 dark:bg-kyn-slate-800 px-2 py-1 rounded-md">
                {guide.category}
              </span>
            </div>
            
            <h2 className="text-lg font-bold text-primary mb-2 leading-tight group-hover:text-kyn-green-600 transition-colors">
              {guide.title}
            </h2>
            
            <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-2 mb-4 leading-relaxed">
              {guide.excerpt}
            </p>

            <div className="flex items-center text-sm font-bold text-kyn-green-600 group-hover:translate-x-1 transition-transform duration-300">
              Read Article <ArrowRight size={16} className="ml-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="bg-kyn-green-50 dark:bg-kyn-green-900/10 p-6 rounded-3xl border border-kyn-green-100 dark:border-kyn-green-900/50 text-center space-y-4">
        <div className="w-12 h-12 bg-kyn-green-100 dark:bg-kyn-green-900/30 text-kyn-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <Mail size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-bold text-primary text-lg">
            Stay organised
          </h3>
          <p className="text-sm text-kyn-slate-600 dark:text-kyn-slate-400 mt-1">
            Get the latest guides delivered to your inbox.
          </p>
        </div>
        
        <div className="flex gap-2 max-w-sm mx-auto pt-2">
          <input 
            type="email" 
            placeholder="you@email.com" 
            className="
              flex-1 px-4 py-2.5 rounded-xl text-sm
              border border-kyn-slate-200 dark:border-kyn-slate-700 
              bg-white dark:bg-kyn-slate-800 
              focus:ring-2 focus:ring-kyn-green-500 focus:border-transparent outline-none transition-all
            "
          />
          <button className="bg-kyn-green-600 hover:bg-kyn-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-kyn-green-900/10 transition-colors">
            Join
          </button>
        </div>
      </div>

    </div>
  );
}
