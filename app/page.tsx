import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard'; // <-- Import the component

// 1. Define the Product Interface (Matches your DB)
interface Product {
  id: string;
  title: string;
  world: 'Home' | 'Lifestyle' | 'Tools';
  short_description: string;
  slug: string;
  price_id?: string;
}

// 2. Data Fetching Function (Server Side)
async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false }) // Show newest first
    .limit(4); // Increased to 4 to look better in a grid
    
  return data as Product[] || [];
}

export default async function Home() {
  // 3. Fetch data dynamically
  const products = await getFeaturedProducts();

  return (
    <div className="px-4 py-6 space-y-12 pb-24">
      
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight text-kyn-slate-900 dark:text-white">
          One universe, <br />
          <span className="text-kyn-green-600 dark:text-kyn-green-400">unlimited solutions.</span>
        </h1>
        <p className="text-kyn-slate-600 dark:text-kyn-slate-300 text-lg">
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
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-kyn-slate-500">
            New Arrivals
          </h2>
          <Link href="/store" className="text-xs text-kyn-green-600 font-medium hover:underline">
            View All
          </Link>
        </div>
        
        {/* Uses CSS Grid for 2 columns on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            // Use the reusable component!
            <ProductCard key={product.id} product={product} />
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-8 bg-kyn-slate-50 dark:bg-kyn-slate-800/50 rounded-xl border border-dashed border-kyn-slate-200 dark:border-kyn-slate-700">
              <p className="text-kyn-slate-500 text-sm">No products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Static Worlds Links */}
      <section className="space-y-4 pt-4 border-t border-kyn-slate-200 dark:border-kyn-slate-800">
         <h2 className="text-sm uppercase tracking-wider font-semibold text-kyn-slate-500">
          Browse by World
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {['Home', 'Lifestyle', 'Tools'].map((w) => (
            <Link 
              key={w} 
              href={`/store?world=${w.toLowerCase()}`} 
              className="px-6 py-3 bg-white dark:bg-kyn-slate-800 border border-kyn-slate-200 dark:border-kyn-slate-700 rounded-xl text-sm font-bold whitespace-nowrap shadow-sm hover:border-kyn-green-300 transition-colors"
            >
              {w}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
