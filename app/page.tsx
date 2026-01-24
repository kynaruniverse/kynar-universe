import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/services/products.server';
import { EmptyState } from '@/components/ui/EmptyState';
import { WORLD_CONFIG } from '@/lib/constants';

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts({ limit: 4 });
  
  return (
    <div className="px-6 py-10 space-y-16 pb-32 animate-in fade-in duration-1000">
      
      {/* --- 1. Hero Section --- */}
      <section className="text-center space-y-6 pt-10 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kyn-green-50 dark:bg-kyn-green-900/20 border border-kyn-green-100 dark:border-kyn-green-900/30">
          <Sparkles size={12} className="text-kyn-green-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-green-700 dark:text-kyn-green-400">
            One Universe
          </span>
        </div>

        <h1 className="text-4xl font-black tracking-tighter text-primary leading-[1.1] sm:text-5xl">
          One universe,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-kyn-green-600 to-kyn-green-400">
            unlimited solutions
          </span>
        </h1>

        <p className="text-kyn-slate-500 dark:text-kyn-slate-400 text-base max-w-[280px] mx-auto font-medium leading-relaxed">
          Curated digital tools to organise your home, life, and projects.
        </p>

        <div className="pt-4">
          <Link 
            href="/store" 
            className="
              inline-flex items-center justify-center 
              bg-kyn-green-600 hover:bg-kyn-green-500 
              text-white font-bold 
              px-10 py-4 rounded-[1.5rem] 
              shadow-xl shadow-kyn-green-600/20 
              transition-all active:scale-95
            "
          >
            Start Exploring
            <ArrowRight className="ml-2 w-5 h-5 opacity-70" />
          </Link>
        </div>
      </section>

      {/* --- 2. New Arrivals --- */}
      <section className="space-y-6">
        <div className="flex items-end justify-between px-1">
          <div className="space-y-1">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-kyn-slate-400">
              The Latest
            </h2>
            <p className="text-lg font-bold text-primary">New Arrivals</p>
          </div>
          <Link 
            href="/store" 
            className="text-xs text-kyn-green-600 font-bold hover:opacity-70 transition-opacity pb-1"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {products.length === 0 && (
            <div className="col-span-full">
              <EmptyState
                title="Scanning the universe for products..."
                variant="dashed"
              />
            </div>
          )}
        </div>
      </section>

      {/* --- 3. Browse by World --- */}
      <section className="space-y-6 pt-10 border-t border-kyn-slate-100 dark:border-kyn-slate-800">
         <h2 className="text-[10px] uppercase tracking-[0.2em] font-black text-kyn-slate-400 px-1">
          Browse by World
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
          {(Object.keys(WORLD_CONFIG) as Array<keyof typeof WORLD_CONFIG>).map((worldKey) => {
            const config = WORLD_CONFIG[worldKey];
            return (
              <Link 
                key={worldKey} 
                href={`/store?world=${worldKey.toLowerCase()}`} 
                className={`
                  flex-none px-8 py-5 
                  bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 
                  rounded-[2rem] shadow-sm hover:shadow-md
                  transition-all active:scale-95 group
                `}
              >
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${config.colorClasses.text}`}>
                  {worldKey}
                </p>
                <p className="text-sm font-bold text-primary group-hover:text-kyn-green-600 transition-colors">
                  {config.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
