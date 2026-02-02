/**
 * KYNAR UNIVERSE: World Landing (Lifestyle) v2.0
 * TypeScript fixes applied.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Sparkles, Wind, Sun, Coffee } from "lucide-react";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Lifestyle World | Kynar Universe",
  description: "Curated tools for elegant living and personal digital sophistication.",
};

export default async function LifestyleWorldPage() {
  const supabase = await createClient();
  
  // 1. Fetching Warm Data (Server-Side)
  const { data, error } = await supabase
    .from < Product > ("products")
    .select("*")
    .eq("world", "Lifestyle")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("[Lifestyle World] Fetch failure:", error.message);
  }
  
  // Strongly type products
  const products: Product[] = data ?? [];
  
  const breadcrumbPaths = [
    { label: "Universe Hub", href: "/" },
    { label: "Lifestyle", href: "/lifestyle", colorClass: "text-kyn-caramel-600" },
  ];
  
  return (
    <main className="min-h-screen bg-canvas pb-safe-bottom animate-in fade-in duration-700">
      {/* Handrail: Structural Context */}
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Narrative Hero: Personal Sanctuary Management */}
      <header className="px-gutter pt-16 pb-20 text-center md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex justify-center">
            <div className="relative group">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-kyn-caramel-50 border border-kyn-caramel-100 text-kyn-caramel-600 shadow-kynar-soft calm-transition group-hover:rotate-12">
                <Wind size={32} strokeWidth={1.5} />
              </div>
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-border text-kyn-caramel-500 shadow-sm">
                <Sun size={14} />
              </div>
            </div>
          </div>
          
          <h1 className="font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl italic">
            Lifestyle World
          </h1>
          <p className="mt-8 font-ui text-lg leading-relaxed text-text-secondary md:text-xl">
            A sector dedicated to the rituals of focus and well-being. Tools for 
            those who treat their digital habits as an art form.
          </p>
        </div>
      </header>

      {/* Grid Controls */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3 text-kyn-caramel-600">
              <Coffee size={18} strokeWidth={2} />
              <h2 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-text-primary">
                The Selection
              </h2>
            </div>
            <span className="font-ui text-[11px] font-bold uppercase tracking-widest text-text-secondary">
              {products.length} Objects Harmonized
            </span>
          </div>

          {/* Product Matrix */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center rounded-[2.5rem] border-2 border-dashed border-kyn-caramel-100 bg-kyn-caramel-50/20">
              <Sparkles className="mb-4 text-kyn-caramel-300" size={32} strokeWidth={1} />
              <p className="font-ui text-sm text-text-secondary italic">
                The Lifestyle sector is currently being refined.<br />
                New arrivals are being harmonized.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Philosophy: The Choice of Removal */}
      <footer className="mt-40 bg-kyn-caramel-50/30 border-t border-kyn-caramel-100 px-gutter py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-brand text-2xl font-bold text-text-primary italic">
            "Sophistication is found in what we choose to remove."
          </h3>
          <p className="mt-6 font-ui text-base leading-loose text-text-secondary">
            In the Lifestyle World, we prioritize digital objects that offer 
            mental clarity and aesthetic joy. No clutter. No subscriptions. 
            Just permanent, beautiful utility.
          </p>
        </div>
      </footer>
    </main>
  );
}