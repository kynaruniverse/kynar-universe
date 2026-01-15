import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { supabase } from '../../lib/supabase';

// This makes the page fetch fresh data every time it rebuilds
export const revalidate = 0;

export default async function Marketplace() {
  
  // 1. Ask the Database for the products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <main className="min-h-screen bg-home-surface">
      <Navbar />

      {/* Header */}
      <div className="bg-home-base px-4 py-12 text-center">
        <h1 className="text-h1-mob font-bold text-home-text mb-2">Marketplace</h1>
        <p className="text-body font-serif italic text-home-text/80">
          Explore what helps you work and live.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 2. Map over the Real Data */}
          {products?.map((product) => (
            <ProductCard 
              key={product.id}
              title={product.title} 
              category={product.category} 
              price={product.price} 
              summary={product.summary}
              image=""
              slug={product.slug}
            />
          ))}

          {/* Fallback if database is empty */}
          {(!products || products.length === 0) && (
            <p className="text-center text-gray-500 col-span-full">
              Loading universe... (or no products found)
            </p>
          )}

        </div>
      </div>
    </main>
  );
}
 