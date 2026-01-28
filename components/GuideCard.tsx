import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Guide } from '@/types/index';

interface GuideCardProps {
  guide: Guide;
}

/**
 * GuideCard Component:
 * Aligned with Brand Language 3.1: Focuses on "Wisdom" and "Study."
 * Implements specific world accents to ground the user in their current discovery path.
 */
export const GuideCard = ({ guide }: GuideCardProps) => {
  // Determine accent color based on the World (Color Guide 2.0)
  const worldAccents: Record<string, string> = {
    Home: "text-kyn-green-600",
    Lifestyle: "text-kyn-caramel-600",
    Tools: "text-kyn-slate-500"
  };

  const accentClass = worldAccents[guide.world as keyof typeof worldAccents] || worldAccents.Home;

  return (
    <Link href={`/guides/${guide.slug}`} className="group block h-full">
      <div className="kyn-card p-6 h-full flex flex-col transition-all">
        
        {/* Top Metadata */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-kyn-slate-900 border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm">
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
          
          <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-3 leading-relaxed italic font-medium">
            "{guide.excerpt}"
          </p>
        </div>

        {/* Action Link (UX Guide 2.2) */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-kyn-slate-50 dark:border-kyn-slate-800/50">
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
