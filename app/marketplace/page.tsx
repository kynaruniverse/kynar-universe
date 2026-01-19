import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';
import MarketplaceFilters from '../../components/MarketplaceFilters';
import { getCategoryTheme } from '../../lib/theme';

/**
 * PRODUCT MARKETPLACE: Optimized for readability and performance.
 */
export const revalidate = 0;

export default async function Marketplace({ 
  searchParams 
}: { 
  searchParams: { category?: string; search?: string } 
}) {
  const categoryFilter = searchParams?.category;
  const searchFilter = searchParams?.search;

  // 1. DATA FETCHING: Build query based on active filters
  let query = supabase.from('products').select('*');

  if (categoryFilter && categoryFilter !== 'All') {
    query = query.eq('category', categoryFilter);
  }

  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`);
  }

  const { data: products, error } = await query.order('created_at', { ascending: false });

  if (error) console.error('Product Query Error:', error);

  return (
    <main className="min-h-screen bg-brand-base pb-32 transition-colors duration-1000">
      
      {/* 1. DYNAMIC HEADER: Updates based on selected category */}
      <MarketplaceHeader category={categoryFilter} />

      {/* 2. FILTERING & PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <MarketplaceFilters />
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.title} 
                category={product.category} 
                price={product.price} 
                summary={product.summary}
                slug={product.slug}
                image={product.image}
                creator={product.creator} 
              />
            ))}
          </div>
        ) : (
          <EmptyState searchFilter={searchFilter} categoryFilter={categoryFilter} />
        )}
      </section>
    </main>
  );
}

/**
 * SUB-COMPONENT: Marketplace Header
 * Refined category messaging for "Universal Language"
 */
function MarketplaceHeader({ category }: { category?: string }) {
  const isAll = !category || category === 'All';

  return (
    <section className="px-6 py-24 md:py-40 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="font-sans text-6xl md:text-[100px] font-semibold tracking-tight text-brand-text leading-[0.9]">
          {isAll ? 'The Store' : getCategoryTheme(category).label}
        </h1>
        <p className={`font-body text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed px-4 ${isAll ? 'text-brand-text/50' : getCategoryTheme(category).text}`}>
          {isAll && "High-quality digital assets designed for professional and creative use."}
          {category === 'Tools' && "Tools and resources for projects, tasks, and daily workflows."}
          {category === 'Life' && "Resources for everyone who wants to make, design, or craft something new."}
          {category === 'Home' && "Guides, planners, and tools for learners of all ages and backgrounds."}
        </p>

      </div>
    </section>
  );
}

/**
 * SUB-COMPONENT: Empty State
 */
function EmptyState({ searchFilter, categoryFilter }: { searchFilter?: string, categoryFilter?: string }) {
  return (
    <div className="text-center py-32 card-elevated surface-frosted max-w-2xl mx-auto px-12 border-none">
      <div className="w-16 h-16 bg-brand-base rounded-inner mx-auto mb-10 flex items-center justify-center text-brand-text/10 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Empty</span>
      </div>
      <h2 className="font-sans text-3xl font-semibold text-brand-text mb-6 tracking-tight">No Results</h2>
      <p className="font-body text-brand-text/50 mb-12 leading-relaxed text-lg">
        We couldn't find a match for &ldquo;{searchFilter}&rdquo; within our {categoryFilter?.toLowerCase() || 'products'}.
      </p>
      <a href="/marketplace" className="btn-primary px-12 py-5 text-[10px] tracking-[0.3em]">
        RESET FILTERS
      </a>
    </div>
  );
}