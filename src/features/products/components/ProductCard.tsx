'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types/models';
import { WORLD_CONFIG } from '@/shared/constants/worlds';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const FALLBACK_THEME = {
  bg: 'bg-surface',
  border: 'border-kyn-slate-100 dark:border-kyn-slate-800',
  hover: 'hover:border-kyn-slate-200 dark:hover:border-kyn-slate-700',
  badge: 'bg-kyn-slate-600',
  text: 'text-kyn-slate-600 dark:text-kyn-slate-400',
};

export default function ProductCard({ product }: { product: Product }) {
  const theme = useMemo(() => {
    // Ensure we handle case-sensitivity (e.g., 'Tools' vs 'tools')
    const worldName = product?.world?.charAt(0).toUpperCase() + product?.world?.slice(1).toLowerCase();
    const worldConfig = WORLD_CONFIG[worldName as keyof typeof WORLD_CONFIG];
    
    return worldConfig?.colorClasses || FALLBACK_THEME;
  }, [product?.world]);

  if (!product) return null;

  return (
    <Link href={`/product/${product.slug}`} className="block group h-full">
      <div 
        className={`
          relative h-full p-6 rounded-[2.5rem] border flex flex-col justify-between
          transition-all duration-500 active:scale-[0.98]
          shadow-sm hover:shadow-2xl hover:shadow-kyn-slate-200/40 dark:shadow-none
          ${theme.bg} ${theme.border} ${theme.hover}
        `}
      >
        {/* Decorative Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
          <ArrowUpRight size={18} className={theme.text} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span 
              className={`
                px-3 py-1 rounded-full 
                text-[8px] font-black text-white tracking-[0.15em] uppercase shadow-sm
                ${theme.badge}
              `}
            >
              {product.world}
            </span>
            {!product.is_published && (
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest italic">
                Draft
              </span>
            )}
          </div>
          
          <h3 className="text-[16px] font-black text-primary mb-2 leading-tight tracking-tight italic group-hover:text-kyn-green-600 transition-colors">
            {product.title}
          </h3>
          
          <p className="text-[11px] font-medium text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-2 leading-relaxed opacity-80">
            {product.short_description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-kyn-slate-50 dark:border-kyn-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles size={10} className="text-kyn-caramel-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-kyn-slate-400">
              {product.category || 'Artifact'}
            </span>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${theme.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
            Decrypt
          </span>
        </div>
      </div>
    </Link>
  );
}
