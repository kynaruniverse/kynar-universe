import { supabase } from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';
import MarketplaceFilters from '../../components/MarketplaceFilters';

/**
 * THE REGISTRY GALLERY
 * A real-time synchronized view of curated digital assets.
 */
export const revalidate = 0;

export default async function Marketplace({ 
  searchParams 
}: { 
  searchParams: { category?: string; search?: string } 
}) {
  
  const categoryFilter = searchParams?.category;
  const searchFilter = searchParams?.search;

  // 1. REGISTRY QUERY PROTOCOL
  let query = supabase.from('products').select('*');

  if (categoryFilter && categoryFilter !== 'All') {
    query = query.eq('category', categoryFilter);
  }

  if (searchFilter) {
    query = query.ilike('title', `%${searchFilter}%`);
  }

  // PHASE 1 ALIGNMENT: Only showing assets marked as live for preview
  // In Phase 2, you will set is_live = false for restricted items
  query = query.order('created_at', { ascending: false });

  const { data: products, error } = await query;

  if (error) console.error('Registry Query Error:', error);

  return (
    <main className="min-h-screen bg-brand-base pb-32 transition-colors duration-1000">
      
      {/* SECTION 1: EDITORIAL ORIENTATION */}
      <section className="px-6 py-24 md:py-40 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
           <h1 className="font-sans text-6xl md:text-[100px] font-semibold tracking-tight text-brand-text leading-[0.9]">
            {categoryFilter && categoryFilter !== 'All' ? categoryFilter : 'The Collection'}
          </h1>
          <p className="font-body text-lg md:text-2xl font-medium text-brand-text/50 max-w-2xl mx-auto leading-relaxed px-4">
            {(!categoryFilter || categoryFilter === 'All') && "Preview our high-fidelity digital assets, curated for intentional living. Access unlocking soon."}
            {categoryFilter === 'Tools' && "Refined resources to elevate your professional architecture. Unlocking soon."}
            {categoryFilter === 'Life' && "Mindful protocols designed for personal synchronization. Unlocking soon."}
            {categoryFilter === 'Home' && "Grounded solutions for an organized sanctuary. Unlocking soon."}
          </p>
        </div>
      </section>

      {/* SECTION 2: DISCOVERY INTERFACE */}
      <section className="max-w-7xl mx-auto px-6">
        
        {/* TACTILE FILTERS: Intelligence on Demand */}
        <div className="mb-20">
          <MarketplaceFilters />
        </div>

        {/* SECTION 3: REGISTRY DISCOVERIES */}
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
          /* EMPTY STATE: Curator's Note */
          <div className="text-center py-32 brand-card surface-mocha max-w-2xl mx-auto px-12 border-none">
            <div className="w-16 h-16 bg-brand-base rounded-inner mx-auto mb-10 flex items-center justify-center text-brand-text/10 shadow-sm">
               <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Void</span>
            </div>
            <h2 className="font-sans text-3xl font-semibold text-brand-text mb-6 tracking-tight">Discovery Exhausted</h2>
            <p className="font-body text-brand-text/50 mb-12 leading-relaxed text-lg">
              The registry does not currently contain a match for &ldquo;{searchFilter}&rdquo; within our preview selections.
            </p>
            <a 
              href="/marketplace" 
              className="btn-primary px-12 py-5 text-[10px] tracking-[0.3em]"
            >
              RESET DISCOVERY
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
