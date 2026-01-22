import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';
// 2. Data Fetching Function (Server Side)
async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('id, title, slug, world, short_description, preview_image')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4);
    
  return data as Product[] || [];
}

export default async function Home() {
  // 3. Fetch data dynamically
  const products = await getFeaturedProducts();

  return (
    <div className="px-4 py-6 space-y-12">
      
      { /* Hero Section - Aligned with Brand Guide 1.1 & Language Guide 8.1 */ }
<section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-kyn-slate-900 dark:text-white leading-tight">
          One universe, <br />
          <span className="text-kyn-green-600 dark:text-kyn-green-400">unlimited solutions</span>
        </h1>
        <p className="text-kyn-slate-600 dark:text-kyn-slate-300 text-base px-4">
          Organise home, life, and projects in one place.
        </p>
        <div className="pt-4">
          <Link 
            href="/store" 
            className="inline-flex items-center bg-kyn-green-600 hover:bg-kyn-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            Browse Store
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Dynamic Products Showcase */}
      <section className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-kyn-slate-500">
          New Arrivals
        </h2>
        
        <div className="grid gap-4">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="block group">
              <div className={`
                border p-6 rounded-2xl transition-all hover:shadow-md 
                ${product.world === 'Home' ? 'bg-kyn-green-50 border-kyn-green-100 dark:bg-kyn-green-900/20 dark:border-kyn-green-800 hover:border-kyn-green-300' : ''}
                ${product.world === 'Lifestyle' ? 'bg-kyn-caramel-50 border-kyn-caramel-100 dark:bg-kyn-caramel-900/20 dark:border-kyn-caramel-800 hover:border-kyn-caramel-300' : ''}
                ${product.world === 'Tools' ? 'bg-kyn-slate-50 border-kyn-slate-200 dark:bg-kyn-slate-800/50 dark:border-kyn-slate-700 hover:border-kyn-slate-400' : ''}
              `}>
                <span className={`
                  inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3
                  ${product.world === 'Home' ? 'bg-kyn-green-500' : ''}
                  ${product.world === 'Lifestyle' ? 'bg-kyn-caramel-500' : ''}
                  ${product.world === 'Tools' ? 'bg-kyn-slate-500' : ''}
                `}>
                  {product.world}
                </span>
                <h3 className="text-xl font-bold text-kyn-slate-900 dark:text-white">
                  {product.title}
                </h3>
                <p className="text-sm text-kyn-slate-600 dark:text-kyn-slate-300 mt-2">
                  {product.short_description}
                </p>
              </div>
            </Link>
          ))}

          {products.length === 0 && (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </section>

      {/* Static Worlds Links (Keep these for navigation) */}
      <section className="space-y-4 pt-4 border-t border-kyn-slate-200 dark:border-kyn-slate-800">
         <h2 className="text-sm uppercase tracking-wider font-semibold text-kyn-slate-500">
          Browse by World
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Home', 'Lifestyle', 'Tools'].map((w) => (
            <Link key={w} href={`/store?world=${w.toLowerCase()}`} className="px-4 py-2 bg-white dark:bg-kyn-slate-800 border border-kyn-slate-200 dark:border-kyn-slate-700 rounded-lg text-sm font-medium whitespace-nowrap">
              {w}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
