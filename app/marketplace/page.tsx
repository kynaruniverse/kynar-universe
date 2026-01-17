import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';
import MarketplaceFilters from '../../components/MarketplaceFilters';

// Force dynamic rendering for instant search/filter updates
export const revalidate = 0;

export default async function Marketplace({ 
  searchParams 
}: { 
  searchParams: { category?: string; search?: string } 
}) {
  
  const categoryFilter = searchParams?.category;
  const searchFilter = searchParams?.search;

  // Build the Supabase Query
  let query = supabase.from('products').select('*');

  if (categoryFilter && categoryFilter !== 'All') {
    query = query.eq('category', categoryFilter);
  }

  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`);
  }

  query = query.order('id', { ascending: false });

  const { data: products, error } = await query;

  if (error) console.error('Supabase Error:', error);

  // --- PREMIUM DYNAMIC THEMING ---
  const themes = {
    Tools: { base: "bg-tools-base", header: "border-tools-accent/10", accent: "text-tools-accent" },
    Life: { base: "bg-life-base", header: "border-life-accent/10", accent: "text-life-accent" },
    Home: { base: "bg-cat-home-base", header: "border-cat-home-accent/10", accent: "text-cat-home-accent" },
    All: { base: "bg-home-base", header: "border-home-accent/10", accent: "text-home-accent" }
  };

  const activeTheme = themes[categoryFilter as keyof typeof themes] || themes.All;

  return (
    <main className={`min-h-screen ${activeTheme.base} pb-32 transition-colors duration-1000 ease-in-out`}>
      
      {/* 1. DYNAMIC HEADER */}
      <div className={`bg-white/40 backdrop-blur-md px-6 py-20 text-center border-b ${activeTheme.header} mb-12 transition-all duration-1000`}>
        <div className="max-w-4xl mx-auto space-y-4">
           <h1 className="text-5xl md:text-7xl font-black font-sans text-primary-text tracking-tighter animate-fade-in uppercase">
            {categoryFilter && categoryFilter !== 'All' ? categoryFilter : 'Marketplace'}
          </h1>
          <p className="text-lg md:text-2xl font-serif italic text-primary-text/60 leading-relaxed max-w-2xl mx-auto px-4 animate-fade-in-up">
            {(!categoryFilter || categoryFilter === 'All') && "Explore calm tools for work, life, and home."}
            {categoryFilter === 'Tools' && "Clear tools for a brighter, more organized workflow."}
            {categoryFilter === 'Life' && "Resources to help you learn, grow, and feel inspired."}
            {categoryFilter === 'Home' && "Simple tools for the routines and people who matter."}
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT SECTOR */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* FILTERS COMPONENT */}
        <div className="mb-12">
          <MarketplaceFilters />
        </div>

        {/* 3. KINETIC PRODUCT GRID */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up">
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
          /* Empty State (Premium Glass Design) */
          <div className="text-center py-32 bg-white/30 rounded-[40px] border border-white/20 shadow-glass backdrop-blur-xl max-w-2xl mx-auto px-8 animate-fade-in">
            <div className={`w-16 h-16 ${activeTheme.base} rounded-full mx-auto mb-6 flex items-center justify-center border border-black/5`}>
               <span className="text-2xl">✨</span>
            </div>
            <p className="text-2xl font-bold text-primary-text tracking-tight mb-2">The Universe is quiet here.</p>
            <p className="text-primary-text/50 font-serif italic mb-8">
              We couldn't find matches for "{searchFilter}" in {categoryFilter || 'all sectors'}.
            </p>
            <a 
              href="/marketplace" 
              className="px-8 py-3 bg-primary-text text-white rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all inline-block"
            >
              Reset Filters
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
