import Link from 'next/link';
import { BookOpen, ArrowRight, Lightbulb, Star, Zap } from 'lucide-react';

export const metadata = {
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
      color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
      date: "Oct 12, 2025"
    },
    {
      id: 2,
      title: "Setting up your Creator Dashboard",
      category: "Tutorials",
      excerpt: "A step-by-step walkthrough of the Ultimate Creator Pack. Learn how to track sponsors and scripts.",
      icon: Star,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
      date: "Oct 15, 2025"
    },
    {
      id: 3,
      title: "Why digital decluttering matters",
      category: "Wellness",
      excerpt: "A messy desktop equals a messy mind. Science-backed reasons to clean up your files today.",
      icon: Lightbulb,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
      date: "Oct 20, 2025"
    }
  ];

  return (
    <div className="px-4 py-6 pb-24 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-kyn-slate-900 dark:text-white">
          The Hub
        </h1>
        <p className="text-kyn-slate-500">
          Guides, tutorials, and inspiration.
        </p>
      </div>

      {/* Featured Categories [UX Guide 6.2] */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {['Latest', 'Usage Guides', 'Creator Tips'].map((cat, i) => (
          <button 
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${i === 0 ? 'bg-kyn-slate-800 text-white border-kyn-slate-800' : 'bg-white dark:bg-kyn-slate-800 border-kyn-slate-200 dark:border-kyn-slate-700 text-kyn-slate-600 dark:text-kyn-slate-300'}`}
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
            className="bg-white dark:bg-kyn-slate-800 p-5 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 hover:border-kyn-green-300 transition-colors group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg ${guide.color}`}>
                <guide.icon size={20} />
              </div>
              <span className="text-xs text-kyn-slate-400 font-medium">
                {guide.date}
              </span>
            </div>
            
            <h2 className="text-lg font-bold text-kyn-slate-900 dark:text-white mb-2 leading-tight group-hover:text-kyn-green-600 transition-colors">
              {guide.title}
            </h2>
            
            <p className="text-sm text-kyn-slate-500 line-clamp-2 mb-4">
              {guide.excerpt}
            </p>

            <div className="flex items-center text-sm font-bold text-kyn-green-600">
              Read Article <ArrowRight size={16} className="ml-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Section [UX Guide 2.1] */}
      <div className="bg-kyn-green-50 dark:bg-kyn-green-900/10 p-6 rounded-2xl border border-kyn-green-100 dark:border-kyn-green-900 text-center space-y-4">
        <h3 className="font-bold text-kyn-slate-900 dark:text-white">
          Stay Organised
        </h3>
        <p className="text-sm text-kyn-slate-600 dark:text-kyn-slate-300">
          Get new releases and tips sent to your inbox.
        </p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="you@email.com" 
            className="flex-1 px-4 py-2 rounded-lg border border-kyn-slate-200 dark:border-kyn-slate-700 bg-white dark:bg-kyn-slate-800 text-sm"
          />
          <button className="bg-kyn-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            Join
          </button>
        </div>
      </div>

    </div>
  );
}
