import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';

// Force dynamic rendering so price changes update immediately
export const revalidate = 0;

export default async function Marketplace({ searchParams }: { searchParams: { category?: string } }) {
  
  // 1. Get the category filter from the URL (e.g. ?category=Tools)
  const categoryFilter = searchParams?.category;

  // 2. Build the query
  let query = supabase.from('products').select('*').order('id', { ascending: true });

  // 3. Apply filter if it exists
  if (categoryFilter) {
    query = query.eq('category', categoryFilter);
  }

  // 4. Fetch data
  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <main className="min-h-screen bg-home-base pb-24">
      
      {/* HEADER SECTION */}
      <div className="bg-home-surface px-4 py-16 text-center border-b border-home-accent/10 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary-text mb-4">
          {categoryFilter ? `${categoryFilter}` : 'Marketplace'}
        </h1>
        <p className="text-xl font-serif italic text-primary-text/70 max-w-2xl mx-auto">
          {categoryFilter 
            ? `Explore tools for ${categoryFilter.toLowerCase()}.`
            : "Explore what helps you work, live, and learn."}
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* If products exist, show them */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20 opacity-60">
            <p className="text-lg font-serif">The shelves are quiet right now.</p>
            <p className="text-sm">(No products found in database)</p>
          </div>
        )}

      </div>
    </main>
  );
}
