import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';
import MarketplaceFilters from '../../components/MarketplaceFilters'; // <--- IMPORT NEW COMPONENT

// Force dynamic rendering so search works instantly
export const revalidate = 0;

export default async function Marketplace({ 
  searchParams 
}: { 
  searchParams: { category?: string; search?: string } 
}) {
  
  // 1. Get filters from URL
  const categoryFilter = searchParams?.category;
  const searchFilter = searchParams?.search;

  // 2. Build the query
  // Start with base query
  let query = supabase.from('products').select('*');

  // 3. Apply Category Filter
  if (categoryFilter && categoryFilter !== 'All') {
    query = query.eq('category', categoryFilter);
  }

  // 4. Apply Search Filter (Case-insensitive title search)
  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`);
  }

  // 5. Default Sort (Newest First)
  query = query.order('id', { ascending: false });

  // 6. Fetch data
  const { data: products, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <main className="min-h-screen bg-home-base pb-24">
      
      {/* HEADER SECTION (Dynamic Visuals) */}
      <div className="bg-home-surface px-4 py-16 text-center border-b border-home-accent/10 mb-8 transition-colors duration-500">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-primary-text mb-4 animate-fade-in">
          {categoryFilter && categoryFilter !== 'All' ? `${categoryFilter}` : 'Marketplace'}
        </h1>
        <p className="text-xl font-serif italic text-primary-text/70 max-w-2xl mx-auto">
          {categoryFilter === 'Tools' && "Clear tools for a brighter workflow."}
          {categoryFilter === 'Life' && "Explore what helps you learn, grow, and feel inspired."}
          {categoryFilter === 'Home' && "Warm, simple tools for families and daily comfort."}
          {(!categoryFilter || categoryFilter === 'All') && "Explore what helps you work, live, and learn."}
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4">
        
        {/* CONTROL CENTER (The new Filters) */}
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
          /* Empty State (Better UX) */
          <div className="text-center py-20 bg-white/50 rounded-card border border-white/50">
            <p className="text-2xl font-bold text-primary-text/40 mb-2">No matches found.</p>
            <p className="text-primary-text/60 font-serif italic">
              Try adjusting your search or switching categories.
            </p>
            {/* Reset Button */}
            <a href="/marketplace" className="inline-block mt-4 text-sm font-bold text-home-accent hover:underline">
              Clear all filters
            </a>
          </div>
        )}

      </div>
    </main>
  );
}
