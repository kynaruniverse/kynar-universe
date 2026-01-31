/**
 * KYNAR UNIVERSE: The Marketplace (v1.5)
 * Status: Full Type Sync & Next.js 15 Async Fix
 */

import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { Product, World, WORLDS } from "@/lib/supabase/types";
import { getPriceFromId } from "@/lib/marketplace/pricing";

interface StorePageProps {
  searchParams: Promise<{
    world?: string;
    sort?: string;
  }>;
}

export default async function StorePage({ searchParams }: StorePageProps) {
  // 1. Resolve searchParams (Next.js 15 Requirement)
  const params = await searchParams;
  const supabase = await createClient();
  
  // 2. Fetch all published products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error || !products) {
    console.error("Store Fetch Error:", error);
    return null;
  }

  // 3. Filtering & Sorting Logic
  let filteredProducts = [...products];
  
  // Validate world against your canonical WORLDS array
  const activeWorld = params.world as World;
  if (activeWorld && WORLDS.includes(activeWorld)) {
    filteredProducts = products.filter(p => p.world === activeWorld);
  }

  // Type-safe sorting
  if (params.sort === 'price_asc') {
    filteredProducts.sort((a, b) => (getPriceFromId(a.price_id) || 0) - (getPriceFromId(b.price_id) || 0));
  } else if (params.sort === 'price_desc') {
    filteredProducts.sort((a, b) => (getPriceFromId(b.price_id) || 0) - (getPriceFromId(a.price_id) || 0));
  }

  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-700 ease-out">
      <header className="px-6 py-16 md:py-24 text-center border-b border-border bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-brand text-4xl font-medium text-kyn-slate-900 md:text-6xl tracking-tight">
            The Marketplace
          </h1>
          <p className="mt-6 font-ui text-lg text-kyn-slate-500 leading-relaxed">
            Curated tools for your digital estate. Every acquisition is permanent, 
            secured by your personal vault.
          </p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Navigation & Filtering */}
        <div className="sticky top-0 z-10 py-8 bg-canvas/80 backdrop-blur-md border-b border-border mb-12">
          <FilterBar currentWorld={activeWorld || 'All' as any} />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center rounded-3xl border border-dashed border-border">
            <p className="font-ui text-kyn-slate-400">No tools found in this sector of the universe.</p>
          </div>
        )}
      </div>
    </main>
  );
}
