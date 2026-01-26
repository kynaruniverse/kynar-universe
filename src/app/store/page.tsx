import { Metadata } from 'next';
import { PackageX, Sparkles } from 'lucide-react';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import ProductCard from '@/features/products/components/ProductCard';
import StoreSearch from '@/shared/components/ui/StoreSearch';
import WorldFilter from '@/shared/components/ui/WorldFilter';
import { getProducts } from '@/features/products/schemas/product.schema';

export const metadata: Metadata = {
  title: 'Archive | Kynar Universe',
  description: 'Discover digital artifacts across all dimensions.',
};
export const revalidate = 60; // Revalidate every minute

interface StoreProps {
  searchParams: Promise<{ world?: string; q?: string }>;
}

export default async function StorePage({ searchParams }: StoreProps) {
  const params = await searchParams;
  const { world, q } = params;
  
  // Fetch filtered products
  const products = await getProducts({ 
    world: world, 
    search: q 
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
                {products.length} Artifacts Indexed
              </p>
            </div>
          </div>
        </div>
        
        <StoreSearch />
      </div>

      {/* Dimensional Filter */}
      <WorldFilter />

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <EmptyState
          icon={PackageX}
          title="No Matches Found"
          description="In this sector of the universe"
        />
      )}
    </div>
  );
}
