import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

// 1. Force dynamic rendering for search params
export const dynamic = 'force-dynamic';

// 2. Define Filter Types
const WORLDS = ['Home', 'Lifestyle', 'Tools'];

async function getProducts(worldFilter?: string) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (worldFilter) {
    // Capitalize first letter to match DB (e.g., 'home' -> 'Home')
    const formattedWorld = worldFilter.charAt(0).toUpperCase() + worldFilter.slice(1);
    query = query.eq('world', formattedWorld);
  }

  const { data } = await query;
  return data || [];
}

export default async function StorePage({ searchParams }: { searchParams: Promise<{ world?: string }> }) {
  const { world } = await searchParams;
  const products = await getProducts(world);

  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-kyn-slate-900 dark:text-white">
          Browse Store
        </h1>
        <p className="text-kyn-slate-500 text-sm">
          {products.length} {products.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {/* Filter Chips [UX Guide 7.2] */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <Link 
          href="/store"
          className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors
            ${!world 
              ? 'bg-kyn-slate-800 text-white border-kyn-slate-800 dark:bg-white dark:text-kyn-slate-900' 
              : 'bg-white dark:bg-kyn-slate-800 border-kyn-slate-200 dark:border-kyn-slate-700 text-kyn-slate-600 dark:text-kyn-slate-300'}
          `}
        >
          All
        </Link>
        
        {WORLDS.map((w) => {
          const isActive = world?.toLowerCase() === w.toLowerCase();
          return (
            <Link 
              key={w} 
              href={`/store?world=${w.toLowerCase()}`}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors
                ${isActive 
                  ? 'bg-kyn-slate-800 text-white border-kyn-slate-800 dark:bg-white dark:text-kyn-slate-900' 
                  : 'bg-white dark:bg-kyn-slate-800 border-kyn-slate-200 dark:border-kyn-slate-700 text-kyn-slate-600 dark:text-kyn-slate-300'}
              `}
            >
              {w}
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State [UX Guide 7.3] */}
      {products.length === 0 && (
        <div className="py-12 text-center space-y-4">
          <p className="text-kyn-slate-500">
            No products found for this world yet.
          </p>
          <Link href="/store" className="text-kyn-green-600 font-medium hover:underline">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}
