import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  slug: string;
  world: 'Home' | 'Lifestyle' | 'Tools';
  short_description: string;
  price_id?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  // Determine styles based on World 
  const theme = 
    product.world === 'Home' ? {
      bg: 'bg-kyn-green-50 dark:bg-kyn-green-900/20',
      border: 'border-kyn-green-100 dark:border-kyn-green-800', 
      hover: 'hover:border-kyn-green-300',
      badge: 'bg-kyn-green-500'
    } :
    product.world === 'Lifestyle' ? {
      bg: 'bg-kyn-caramel-50 dark:bg-kyn-caramel-900/20',
      border: 'border-kyn-caramel-100 dark:border-kyn-caramel-800',
      hover: 'hover:border-kyn-caramel-300',
      badge: 'bg-kyn-caramel-500'
    } :
    { // Tools
      bg: 'bg-kyn-slate-50 dark:bg-kyn-slate-800/50',
      border: 'border-kyn-slate-200 dark:border-kyn-slate-700',
      hover: 'hover:border-kyn-slate-400',
      badge: 'bg-kyn-slate-500'
    };

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
