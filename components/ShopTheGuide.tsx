import { supabase } from '@/lib/supabase';
import { ProductCard } from './ProductCard';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export const ShopTheGuide = async ({ world }: { world: string }) => {
  // Fetch the top 2 products from the same world to provide the "Essential Pair"
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('world', world)
    .eq('is_active', true)
    .limit(2);

  if (!products || products.length === 0) return null;

  // World-specific styling for the container background
  const themeClasses: Record<string, string> = {
    Home: 'bg-kyn-green-50/30 dark:bg-kyn-green-900/10 border-kyn-green-100 dark:border-kyn-green-900/20',
    Lifestyle: 'bg-kyn-caramel-50/30 dark:bg-kyn-caramel-900/10 border-kyn-caramel-100 dark:border-kyn-caramel-900/20',
    Tools: 'bg-kyn-slate-50 dark:bg-kyn-slate-800/30 border-kyn-slate-100 dark:border-kyn-slate-700'
  };

  return (
    <section className={`mt-20 p-8 md:p-12 rounded-[2.5rem] border ${themeClasses[world] || themeClasses.Tools}`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-kyn-green-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">
              Complete the System
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white leading-none">
            Recommended <br /> 
            <span className="text-kyn-green-600">Assets.</span>
          </h2>
          <p className="text-xs font-medium text-kyn-slate-500 mt-4 italic">
            "The tools required to implement the strategies mentioned in this guide."
          </p>
        </div>
        
        <Link 
          href={`/world/${world.toLowerCase()}`} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-900 dark:text-white hover:opacity-70 transition-opacity"
        >
          View Full {world} Collection <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid: 1 Column on Mobile, 2 on Tablet+ to accommodate ProductCard size */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
