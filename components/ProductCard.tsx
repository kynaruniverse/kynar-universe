import Link from 'next/link';
import type { Product } from '@/lib/types';
import { WORLD_CONFIG } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

const FALLBACK_THEME = {
  bg: 'bg-surface',
  border: 'border-kyn-slate-100 dark:border-kyn-slate-800',
  hover: 'hover:border-kyn-slate-200 dark:hover:border-kyn-slate-700',
  badge: 'bg-kyn-slate-600',
  text: 'text-kyn-slate-600 dark:text-kyn-slate-400',
};

export default function ProductCard({ product }: { product: Product }) {
  const worldConfig = WORLD_CONFIG[product.world as keyof typeof WORLD_CONFIG];
  const theme = worldConfig?.colorClasses || FALLBACK_THEME;

  return (
    <Link href={`/product/${product.slug}`} className="block group h-full">
      <div 
        className={`
          relative h-full p-5 rounded-[2rem] border flex flex-col justify-between
          transition-all duration-300 active:scale-[0.97]
          shadow-sm hover:shadow-xl hover:shadow-kyn-slate-200/50 dark:shadow-none
          ${theme.bg} ${theme.border} ${theme.hover}
        `}
      >
        {/* Subtle decorative element for hover state */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={16} className={theme.text} />
        </div>

        <div>
          {/* Badge & Category */}
          <div className="flex flex-col gap-2 mb-4">
            <span 
              className={`
                w-fit px-3 py-1 rounded-full 
                text-[9px] font-black text-white tracking-[0.1em] uppercase
                ${theme.badge}
              `}
            >
              {product.world}
            </span>
          </div>
          
          {/* Title - Increased weight for premium feel */}
          <h3 className="text-[15px] font-black text-primary mb-2 leading-[1.2] line-clamp-2">
            {product.title}
          </h3>
          
          {/* Description - Adjusted leading for better readability */}
          <p className="text-[11px] font-medium text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        </div>

        {/* Footer Area: Price / Category */}
        <div className="mt-5 pt-4 border-t border-kyn-slate-50 dark:border-kyn-slate-800/50 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-kyn-slate-400">
            {product.category || 'Tool'}
          </span>
          <span className={`text-[11px] font-black ${theme.text}`}>
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
