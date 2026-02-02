/**
 * KYNAR UNIVERSE: The Marketplace (v1.5)
 * Role: Primary acquisition hub for digital assets.
 * Optimization: Next.js 15 Async Params & Mobile-First Filter Logic.
 */

import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { Product, World, WORLDS } from "@/lib/supabase/types";
import { getPriceFromId } from "@/lib/marketplace/pricing";
import { Box } from "lucide-react";

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
  
  if (!supabase) return null;

  // 2. Fetch all published products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error || !products) {
    console.error("Store Fetch Error:", error);
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-ui text-sm text-text-secondary">
        Connection to the hub interrupted. Please refresh.
      </div>
    );
  }

  // 3. Filtering & Sorting Logic (Server-Side)
  let filteredProducts = [...products];
  
  // Validate world against canonical WORLDS constant
  const activeWorld = params.world as World;
  if (activeWorld && WORLDS.includes(activeWorld)) {
    filteredProducts = products.filter(p => p.world === activeWorld);
  }

  // Type-safe sorting logic based on price metadata
  if (params.sort === 'price-low') {
    filteredProducts.sort((a, b) => getPriceFromId(a.price_id) - getPriceFromId(b.price_id));
  } else if (params.sort === 'price-high') {
    filteredProducts.sort((a, b) => getPriceFromId(b.price_id) - getPriceFromId(a.price_id));
  }

  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-700 ease-out">
      {/* 1. Atmospheric Header */}
      <header className="px-gutter py-16 md:py-24 text-center border-b border-border bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-brand text-4xl font-bold text-kyn-slate-900 md:text-6xl tracking-tight">
            The Hub
          </h1>
          <p className="mt-6 font-ui text-base md:text-lg text-text-secondary leading-relaxed px-4">
            A curated collection of permanent digital assets. Secured by your vault, 
            designed for a grounded life.
          </p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-gutter">
        {/* 2. Navigation & Filtering (Sticky for Mobile UX) */}
        <div className="sticky top-0 z-30 py-6 bg-canvas/90 backdrop-blur-md mb-8 border-b border-border/50">
          <FilterBar currentWorld={activeWorld || 'All' as any} />
        </div>

        {/* 3. Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="h-12 w-12 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
              <Box size={20} className="text-kyn-slate-300" />
            </div>
            <h2 className="font-brand text-lg font-bold text-kyn-slate-900">Sector Empty</h2>
            <p className="font-ui text-sm text-text-secondary mt-1">
              No tools found in the {activeWorld} sector for these parameters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
