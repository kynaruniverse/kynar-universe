import { ArrowRight, Lightbulb, Star, Zap, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Hub | Kynar Universe',
  description: 'Deep dives and transmissions to help you orchestrate your digital life.',
}

export default function GuidesPage() {
  const guides = [
    {
      id: 1,
      title: 'Organise your week in 5 minutes',
      category: 'Productivity',
      excerpt: 'Stop over-planning. Here is the simple 3-step method to clear your head every Sunday night.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10',
      date: 'Oct 12, 2025'
    },
    {
      id: 2,
      title: 'Setting up your Creator Dashboard',
      category: 'Tutorials',
      excerpt: 'A step-by-step walkthrough of the Ultimate Creator Pack. Learn how to track sponsors and scripts.',
      icon: Star,
      color: 'text-purple-500 bg-purple-500/10',
      date: 'Oct 15, 2025'
    },
    {
      id: 3,
      title: 'Why digital decluttering matters',
      category: 'Wellness',
      excerpt: 'A messy desktop equals a messy mind. Science-backed reasons to clean up your files today.',
      icon: Lightbulb,
      color: 'text-blue-500 bg-blue-500/10',
      date: 'Oct 20, 2025'
    }
  ]

  return (
    <div className='px-6 py-10 pb-32 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
      
      {/* Header */}
      <div className='space-y-2 px-2'>
        <h1 className='text-4xl font-black text-primary tracking-tight italic'>
          The Hub
        </h1>
        <p className='text-kyn-slate-400 text-[10px] font-black uppercase tracking-[0.3em]'>
          Transmissions & Manuals
        </p>
      </div>

      {/* Filter Categories */}
      <div className='flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide'>
        {['All Feed', 'Usage Guides', 'Creator Tips', 'Wellness'].map((cat, i) => (
          <button 
            key={cat}
            className={`
              px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all
              ${i === 0 
                ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' 
                : 'bg-surface border-kyn-slate-100 dark:border-kyn-slate-800 text-kyn-slate-400 hover:border-kyn-slate-300'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Feed */}
      <div className='grid gap-6'>
        {guides.map((guide) => (
          <article 
            key={guide.id}
            className='
              group relative bg-surface p-6 rounded-[2rem] 
              border border-kyn-slate-100 dark:border-kyn-slate-800 
              hover:border-kyn-green-500/50 hover:shadow-2xl hover:shadow-kyn-green-500/5
              transition-all cursor-pointer
            '
          >
            <div className='flex justify-between items-center mb-6'>
              <div className={`p-3 rounded-2xl ${guide.color}`}>
                <guide.icon size={20} strokeWidth={2.5} />
              </div>
              <span className='text-[9px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 bg-kyn-slate-50 dark:bg-kyn-slate-800/50 px-3 py-1.5 rounded-full'>
                {guide.category}
              </span>
            </div>
            
            <h2 className='text-xl font-black text-primary mb-3 leading-tight group-hover:text-kyn-green-600 transition-colors italic'>
              {guide.title}
            </h2>
            
            <p className='text-sm text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-2 mb-6 leading-relaxed font-medium'>
              {guide.excerpt}
            </p>

            <div className='flex items-center text-[10px] font-black uppercase tracking-widest text-kyn-green-600 group-hover:gap-3 transition-all duration-300'>
              Access Protocol <ArrowRight size={14} className='ml-2 opacity-50' />
            </div>
          </article>
        ))}
      </div>

      {/* Transmission Subscription */}
      <div className='relative bg-kyn-green-500/5 p-8 rounded-[2.5rem] border border-kyn-green-500/10 text-center space-y-6 overflow-hidden'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-kyn-green-500/10 blur-[50px] rounded-full' />
        
        <div className='relative space-y-4'>
          <div className='w-14 h-14 bg-surface text-kyn-green-500 rounded-2xl shadow-sm flex items-center justify-center mx-auto border border-kyn-green-500/20'>
            <Mail size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className='font-black text-primary text-xl italic'>
              Stay Orchestrated
            </h3>
            <p className='text-xs text-kyn-slate-500 dark:text-kyn-slate-400 mt-2 max-w-[200px] mx-auto leading-relaxed'>
              Get the latest artifacts and manuals delivered to your terminal.
            </p>
          </div>
          
          <div className='flex flex-col gap-3 max-w-xs mx-auto pt-2'>
            <input 
              type='email' 
              placeholder='identity@email.com' 
              className='
                w-full px-6 py-4 rounded-2xl text-xs font-bold
                border border-kyn-slate-200 dark:border-kyn-slate-800 
                bg-surface focus:ring-4 focus:ring-kyn-green-500/5 focus:border-kyn-green-500 outline-none transition-all
              '
            />
            <button className='w-full bg-primary hover:bg-kyn-green-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95'>
              Join Transmission
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
