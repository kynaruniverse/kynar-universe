import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';
import MarketplaceFilters from '../../components/MarketplaceFilters';

// Ensures search and category filtering happen instantly on the server
export const revalidate = 0;

export default async function Marketplace({ 
  searchParams 
}: { 
  searchParams: { category?: string; search?: string } 
}) {
  
  const categoryFilter = searchParams?.category;
  const searchFilter = searchParams?.search;

  // 1. DYNAMIC QUERY BUILDING
  let query = supabase.from('products').select('*');

  if (categoryFilter && categoryFilter !== 'All') {
    query = query.eq('category', categoryFilter);
  }

  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`);
  }

  // Optimized Sorting: Show newest assets first
  query = query.order('created_at', { ascending: false });

  const { data: products, error } = await query;

  if (error) console.error('Supabase Universe Error:', error);

  // 2. PREMIUM DYNAMIC THEMING
  // These colors match your tailwind.config.ts precisely
  const themes = {
    Tools: { base: "bg-tools-base", header: "border-tools-accent/10", accent: "text-tools-accent" },
    Life: { base: "bg-life-base", header: "border-life-accent/10", accent: "text-life-accent" },
    Home: { base: "bg-cat-home-base", header: "border-cat-home-accent/10", accent: "text-cat-home-accent" },
    All: { base: "bg-home-base", header: "border-home-accent/10", accent: "text-home-accent" }
  };

  const activeTheme = themes[categoryFilter as keyof typeof themes] || themes.All;

  return (
    <main className={`min-h-screen ${activeTheme.base} pb-32 transition-colors duration-1000 ease-in-out`}>
      
      {/* 1. DYNAMIC HEADER SECTOR */}
      <div className={`bg-white/40 backdrop-blur-3xl px-6 py-24 text-center border-b ${activeTheme.header} mb-12 transition-all duration-1000`}>
        <div className="max-w-4xl mx-auto space-y-6">
           <h1 className="text-6xl md:text-8xl font-black font-sans text-primary-text tracking-tighter animate-fade-in uppercase leading-none">
            {categoryFilter && categoryFilter !== 'All' ? categoryFilter : 'Marketplace'}
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-primary-text/40 leading-relaxed max-w-2xl mx-auto px-4 animate-fade-in-up">
            {(!categoryFilter || categoryFilter === 'All') && "Explore calm tools for work, life, and home."}
            {categoryFilter === 'Tools' && "Clear tools for a brighter, more organized workflow."}
            {categoryFilter === 'Life' && "Resources to help you learn, grow, and feel inspired."}
            {categoryFilter === 'Home' && "Simple tools for the routines and people who matter."}
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT SECTOR */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* FILTERS & SEARCH */}
        <div className="mb-16">
          <MarketplaceFilters />
        </div>

        {/* 3. PRODUCT GRID */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
          /* EMPTY STATE */
          <div className="text-center py-32 bg-white/40 rounded-[64px] border border-white/40 shadow-glass backdrop-blur-3xl max-w-2xl mx-auto px-12 animate-fade-in">
            <div className={`w-20 h-20 ${activeTheme.base} rounded-[28px] mx-auto mb-8 flex items-center justify-center border border-black/5 shadow-sm text-3xl`}>
               ✨
            </div>
            <h2 className="text-4xl font-black text-primary-text tracking-tighter mb-4 uppercase">Sector Empty</h2>
            <p className="text-primary-text/40 font-serif text-lg italic mb-10 leading-relaxed">
              We couldn't find matches for "{searchFilter}" in the {categoryFilter || 'Universe'}.
            </p>
            <a 
              href="/marketplace" 
              className="px-12 py-5 bg-primary-text text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all inline-block"
            >
              Reset Search
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
