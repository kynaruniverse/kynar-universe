/**
 * KYNAR UNIVERSE: The Marketplace Hub (v2.3)
 * Fix: Resolved Async searchParams for Next.js 15+ and Netlify build.
 */

import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { Product, World, WORLDS } from "@/lib/supabase/types";
import { Box, Sparkles } from "lucide-react";

interface StorePageProps {
  searchParams: Promise<{ world?: string; sort?: string }>;
}

export default async function StorePage({ searchParams }: StorePageProps) {
  // 1. Properly await searchParams for Next.js 15 production build
  const params = await searchParams;
  
  // 2. Validate the world against the constant for runtime safety
  const activeWorld = params.world as World | undefined;
  
  const supabase = await createClient();
  
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_published", true);
  
  // 3. World validation using type-casting for Postgres Enum compatibility
  if (activeWorld && (WORLDS as unknown as string[]).includes(activeWorld)) {
    query = query.eq("world", activeWorld as string);
  }
  
  const { data: products, error } = await query.order("created_at", { ascending: false });
  
  if (error || !products) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-ui text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
        Connection to the hub interrupted. Please refresh.
      </div>
    );
  }
  
  return (
    <main className="pb-32">
      <header className="relative overflow-hidden border-b border-border bg-surface/50 py-16 md:py-24 px-gutter">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-500 shadow-sm">
            <Sparkles size={12} className="text-kyn-green-500" />
            Permanent Acquisitions
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
        {/* Filter Bar Zone */}
        <div className="sticky top-14 md:top-20 z-30 py-6 bg-canvas/90 backdrop-blur-md mb-8 border-b border-border/50">
          <FilterBar currentWorld={activeWorld ?? "All"} />
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-1000">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center rounded-[2.5rem] border border-dashed border-border bg-surface/50">
            <Box size={32} className="text-kyn-slate-200 mb-4" />
            <h2 className="font-brand text-lg font-bold text-text-primary uppercase tracking-widest">Sector Empty</h2>
            <p className="mt-2 font-ui text-[11px] uppercase tracking-[0.2em] text-kyn-slate-400">No products found in this world yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
