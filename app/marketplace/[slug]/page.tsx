import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';

// Force dynamic rendering so we always get the latest product details
export const revalidate = 0;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  
  // 1. Fetch the specific product from Supabase
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();
  
  // 2. Handle missing products (404)
  if (error || !product) {
    notFound();
  }
  
  // DYNAMIC THEMING
  let themeClass = "bg-home-base"; // Default
  let headerClass = "border-home-accent/10";
  let titleColor = "text-primary-text";
  
  if (categoryFilter === 'Tools') {
    themeClass = "bg-tools-base";
    headerClass = "border-tools-accent/20";
  } else if (categoryFilter === 'Life') {
    themeClass = "bg-life-base";
    headerClass = "border-life-accent/20";
  } else if (categoryFilter === 'Home') {
    themeClass = "bg-cat-home-base";
    headerClass = "border-cat-home-accent/20";
  }
  
  return (
    <main className={`min-h-screen ${themeClass} pb-24 transition-colors duration-700 ease-in-out`}>
      
      {/* HEADER SECTION */}
      <div className={`bg-white/50 backdrop-blur-sm px-4 py-16 text-center border-b ${headerClass} mb-8 transition-all duration-700`}>
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary-text mb-4 animate-fade-in">
          {categoryFilter && categoryFilter !== 'All' ? `${categoryFilter}` : 'Marketplace'}
        </h1>
        <p className="text-xl font-serif italic text-primary-text/70 max-w-2xl mx-auto animate-fade-in-up">
          {(!categoryFilter || categoryFilter === 'All') && "Explore what helps you work, live, and learn."}
          {categoryFilter === 'Tools' && "Clear tools for a brighter workflow."}
          {categoryFilter === 'Life' && "Explore what helps you learn, grow, and feel inspired."}
          {categoryFilter === 'Home' && "Warm, simple tools for families and daily comfort."}
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* FILTERS */}
        <MarketplaceFilters />

        {/* PRODUCT GRID */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.title} 
                category={product.category} 
                price={product.price} 
                summary={product.summary}
                slug={product.slug}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white/60 rounded-card border border-white/20 shadow-sm backdrop-blur-md">
            <p className="text-2xl font-bold text-primary-text/40 mb-2">No matches found.</p>
            <p className="text-primary-text/60 font-serif italic">
              Try adjusting your search or switching categories.
            </p>
            <a href="/marketplace" className="inline-block mt-4 text-sm font-bold text-primary-text/80 hover:underline">
              Clear all filters
            </a>
          </div>
        )}

      </div>
    </main>
  );
}