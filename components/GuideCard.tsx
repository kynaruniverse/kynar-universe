import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const GuideCard = ({ guide }: { guide: any }) => {
  // Determine accent color based on the World
  const accentClass = 
    guide.world === 'Home' ? 'text-kyn-green-600' :
    guide.world === 'Lifestyle' ? 'text-kyn-caramel-500' :
    'text-kyn-slate-500';

  return (
    <Link href={`/guides/${guide.slug}`} className="group block">
      <div className="kyn-card p-6 h-full flex flex-col transition-all hover:border-kyn-slate-200 dark:hover:border-kyn-slate-700">
        
        {/* Top Metadata */}
        <div className="flex justify-between items-center mb-6">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-kyn-slate-900 border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm`}>
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${accentClass}`}>
              {guide.world} World
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-kyn-slate-400 font-bold">
            <Clock size={12} className="opacity-70" />
            <span className="text-[10px] uppercase tracking-widest">
              {guide.reading_time_minutes}m Read
            </span>
          </div>
        </div>
        
        {/* Title & Excerpt */}
        <div className="flex-grow">
          <h3 className="text-xl font-black text-kyn-slate-900 dark:text-white mb-3 uppercase tracking-tighter leading-[1.1] group-hover:text-kyn-green-500 transition-colors">
            {guide.title}
          </h3>
          
          <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-2 leading-relaxed italic font-medium">
            "{guide.excerpt}"
          </p>
        </div>

        {/* Action Link (UX Guide 22) */}
        <div className={`mt-8 flex items-center justify-between pt-4 border-t border-kyn-slate-50 dark:border-kyn-slate-800/50`}>
          <div className="flex items-center gap-2 text-kyn-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.2em]">
            <BookOpen size={14} className={accentClass} />
            Study Guide
          </div>
          <ArrowRight size={16} className="text-kyn-slate-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
