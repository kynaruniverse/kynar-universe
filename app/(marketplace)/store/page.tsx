/**
 * KYNAR UNIVERSE: The Marketplace Hub (v2.0)
 * TypeScript fixes applied.
 */

import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { Product, World, WORLDS } from "@/lib/supabase/types";
import { Box, Sparkles } from "lucide-react";

interface StorePageProps {
  searchParams: { world ? : string;sort ? : string };
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = searchParams;
  const activeWorld = params.world as World | undefined;
  
  const supabase = await createClient();
  
  // 2. Fetch published products
  let query = supabase.from < Product > ("products").select("*").eq("is_published", true);
  
  if (activeWorld && WORLDS.includes(activeWorld)) {
    query = query.eq("world", activeWorld);
  }
  
  const { data: products, error } = await query.order("created_at", { ascending: false });
  
  if (error || !products) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-ui text-sm text-text-secondary">
        Connection to the hub interrupted. Please refresh.
      </div>
    );
  }
  
  // Ensure products is strongly typed
  const typedProducts: Product[] = products;
  
  return (
    <main className="pb-32">
      {/* Editorial Header */}
      <header className="py-16 md:py-24 text-center border-b border-border bg-surface/30 px-gutter">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Sparkles size={24} className="text-kyn-green-500 animate-pulse" />
          </div>
          <h1 className="font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
            The Hub
          </h1>
          <p className="mt-6 font-ui text-base md:text-lg text-text-secondary leading-relaxed">
            A curated collection of permanent digital assets. <br className="hidden md:block" />
            Designed for a grounded life, secured for the long term.
          </p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-gutter">
        {/* Sticky Filter Bar */}
        <div className="sticky top-14 md:top-20 z-30 py-6 bg-canvas/90 backdrop-blur-md mb-8 border-b border-border/50">
          <FilterBar currentWorld={activeWorld ?? "All"} />
        </div>

        {/* Product Grid */}
        {typedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {typedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center rounded-[2.5rem] border border-dashed border-border bg-surface/50">
            <Box size={32} className="text-kyn-slate-200 mb-4" />
            <h2 className="font-brand text-lg font-bold text-text-primary">Sector Empty</h2>
            <p className="font-ui text-sm text-text-secondary mt-2">
              No assets found in the {activeWorld ?? "All"} sector.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}