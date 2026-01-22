import Link from 'next/link';
import type { Product } from '@/lib/types';

import { WORLD_CONFIG } from '@/lib/constants';

export default function ProductCard({ product }: { product: Product }) {
  const theme = WORLD_CONFIG[product.world].colorClasses;

  return (
    <Link href={`/product/${product.slug}`} className="block group h-full">
      <div className={`
        h-full p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col
        ${theme.bg} ${theme.border} ${theme.hover}
      `}>
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-wide ${theme.badge}`}>
            {product.world}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-kyn-slate-900 dark:text-white mb-2 leading-tight">
          {product.title}
        </h3>
        
        <p className="text-sm text-kyn-slate-600 dark:text-kyn-slate-300 line-clamp-2">
          {product.short_description}
        </p>
      </div>
    </Link>
  );
}
