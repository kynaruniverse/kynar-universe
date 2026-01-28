import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Guide } from '@/types/index';

interface GuideCardProps {
  guide: Guide;
  isFeatured?: boolean;
}

/**
 * GuideCard Component:
 * Aligned with Brand Language 3.1: "Ownership is the beginning of order."
 * Uses "The Spotlight" pattern for featured entries to break visual monotony.
 */
export const GuideCard = ({ guide, isFeatured = false }: GuideCardProps) => {
  // World-specific color mapping (Brand Guide 2.0)
  const accents: Record<string, string> = {
    Home: "text-kyn-green-600 bg-kyn-green-50/50 dark:bg-kyn-green-900/10",
    Lifestyle: "text-kyn-caramel-600 bg-kyn-caramel-50/50 dark:bg-kyn-caramel-900/10",
    Tools: "text-kyn-slate-500 bg-kyn-slate-50 dark:bg-kyn-slate-800/50"
  };

  const accentClass = accents[guide.world] || accents.Home;
  const colorOnly = accentClass.split(' ')[0];

  return (
    <Link href={`/guides/${guide.slug}`} className="group block h-full">
      <div className={`
        kyn-card h-full flex flex-col transition-all duration-500 overflow-hidden
        ${isFeatured ? 'md:flex-row md:items-stretch border-2 border-kyn-slate-900 dark:border-white' : 'hover:border-kyn-green-500/30'}
      `}>
        
        {/* Visual Anchor: Only visible on featured or with images */}
        <div className={`
          relative overflow-hidden bg-kyn-slate-100 dark:bg-kyn-slate-800 shrink-0
          ${isFeatured ? 'md:w-2/5 min-h-[240px]' : 'w-full h-48 mb-6 rounded-2xl'}
        `}>
          <img 
            src={guide.thumbnail_url} 
            alt={guide.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kyn-slate-900/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className={`flex flex-col flex-grow ${isFeatured ? 'p-8 md:p-10' : 'p-2'}`}>
          
          {/* Metadata Row */}
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border border-current/10 ${accentClass}`}>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                {guide.world} World
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-kyn-slate-400 font-bold">
              <Clock size={12} className="opacity-70" />
              <span className="text-[10px] uppercase tracking-widest">
                {guide.read_time}
              </span>
            </div>
          </div>
          
          {/* Typography Body */}
          <div className="flex-grow">
            <h3 className={`
              font-black text-kyn-slate-900 dark:text-white mb-4 uppercase tracking-tighter leading-[1.1] 
              group-hover:text-kyn-green-500 transition-colors
              ${isFeatured ? 'text-3xl md:text-4xl' : 'text-xl'}
            `}>
              {guide.title}
            </h3>
            
            <p className={`
              text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed italic font-medium
              ${isFeatured ? 'text-base mb-8 line-clamp-3' : 'text-sm line-clamp-2'}
            `}>
              "{guide.excerpt}"
            </p>
          </div>

          {/* Footer Action */}
          <div className={`
            flex items-center justify-between pt-5 border-t border-kyn-slate-50 dark:border-kyn-slate-800/50 mt-auto
            ${isFeatured ? 'md:pt-8' : 'pt-5'}
          `}>
            <div className="flex items-center gap-2 text-kyn-slate-900 dark:text-white font-black text-[10px] uppercase tracking-[0.3em]">
              <BookOpen size={14} className={colorOnly} />
              Open Manuscript
            </div>
            <div className={`
              p-2 rounded-full transition-all duration-300
              ${isFeatured ? 'bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900' : 'text-kyn-slate-300 group-hover:text-kyn-green-500'}
            `}>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
