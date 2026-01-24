import { Metadata } from 'next';
import { PackageX, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import StoreSearch from '@/components/StoreSearch';
import WorldFilter from '@/components/WorldFilter';
import { getProducts } from '@/lib/services/products';

export const metadata: Metadata = {
  title: 'Archive | Kynar Universe',
  description: 'Discover digital artifacts across all dimensions.',
};

export const dynamic = 'force-dynamic';

interface StoreProps {
  searchParams: Promise<{ world?: string; q?: string }>;
}

export default async function StorePage({ searchParams }: StoreProps) {
  const { world, q } = await searchParams;
  
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
        <div className="py-24 text-center space-y-4 bg-surface rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-800">
          <PackageX className="w-10 h-10 text-kyn-slate-200 mx-auto stroke-1" />
          <div className="space-y-1">
            <p className="text-[11px] font-black text-primary uppercase tracking-widest">No Matches Found</p>
            <p className="text-[9px] font-bold text-kyn-slate-400 uppercase tracking-widest">In this sector of the universe</p>
          </div>
        </div>
      )}
    </div>
  );
}
