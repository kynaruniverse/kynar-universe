import { Metadata } from 'next';
import { PackageX, Sparkles } from 'lucide-react';
// FIX: Using the standardized server service we just built
import { getAllProducts } from '@/features/products/services/products.server';
import ProductCard from '@/features/products/components/ProductCard';
import StoreSearch from '@/shared/components/ui/StoreSearch';
import WorldFilter from '@/shared/components/ui/WorldFilter';
// Note: If EmptyState is missing, we can build a simple inline fallback
import { EmptyState } from '@/shared/components/feedback/EmptyState';

export const metadata: Metadata = {
  title: 'Archive | Kynar Universe',
  description: 'Discover digital artifacts across all dimensions.',
};

export const revalidate = 60; // ISR: Revalidate every minute

interface StoreProps {
  searchParams: Promise<{ world?: string; q?: string }>;
}

export default async function StorePage({ searchParams }: StoreProps) {
  // 1. Await params (Next.js 15 Requirement)
  const { world, q } = await searchParams;
  
  // 2. Fetch all products
  const allProducts = await getAllProducts();

  // 3. Simple client-side filtering logic on the server
  // We do this here to keep the service file clean and reusable
  const filteredProducts = allProducts.filter((p) => {
    const matchesWorld = !world || p.world.toLowerCase() === world.toLowerCase();
    const matchesSearch = !q || 
      p.title.toLowerCase().includes(q.toLowerCase()) || 
      p.short_description?.toLowerCase().includes(q.toLowerCase());
    
    return matchesWorld && matchesSearch;
  });

  return (
    <div className="px-4 py-8 pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* Header & Search */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-primary italic tracking-tight">THE ARCHIVE</h1>
            <div className="flex items-center gap-2">
              <Sparkles size={10} className="text-kyn-green-500" />
              <p className="text-[10px] font-black text-kyn-slate-400 uppercase tracking-[0.2em]">
                {filteredProducts.length} Artifacts Indexed
              </p>
            </div>
          </div>
        </div>
        
        <StoreSearch />
      </div>

      {/* Dimensional Filter */}
      <WorldFilter />

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            // Ensure product is passed with correct type mapping
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PackageX}
          title="No Matches Found"
          description={q ? `No artifacts matching "${q}" in this sector.` : "Sector currently empty."}
        />
      )}
    </div>
  );
}
