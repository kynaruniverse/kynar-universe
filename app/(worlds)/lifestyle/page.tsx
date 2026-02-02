/**
 * KYNAR UNIVERSE: World Landing (Lifestyle) v1.5
 * Role: Sector-specific discovery for personal elegance, wellness, and fluid habits.
 * Alignment: Design System Section 12 (Worlds) & Section 3 (Caramel Palette).
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Sparkles, Wind, Sun, Coffee } from "lucide-react";
import { Database } from "@/lib/supabase/types";

// Explicit type extraction for build safety
type Product = Database['public']['Tables']['products']['Row'];

export const metadata: Metadata = {
  title: "Lifestyle World | Kynar Universe",
  description: "Curated tools for elegant living and personal digital sophistication.",
};

export default async function LifestyleWorldPage() {
  const supabase = await createClient();
  
  // 1. Fetching Warm Data (Server-Side)
  // Filtering strictly for 'Lifestyle' to maintain world-silo integrity
  const { data: products, error } = await supabase
    ?.from("products")
    .select("*")
    .eq("world", "Lifestyle")
    .eq("is_published", true)
    .order("created_at", { ascending: false }) ?? { data: [], error: null };

  const breadcrumbPaths = [
    { label: 'Universe Hub', href: '/store' },
    { label: 'Lifestyle', href: '/lifestyle', colorClass: 'text-kyn-caramel-600' }
  ];

  if (error) {
    console.error("[LifestyleWorld] Data synchronization failed:", error);
  }

  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-kyn-out">
      {/* Handrail Layer */}
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Narrative Hero: Warm & Fluid */}
      <header className="px-gutter pt-16 pb-24 text-center md:pt-32 md:pb-40">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-kyn-caramel-50 border border-kyn-caramel-100 text-kyn-caramel-600 shadow-kynar-soft">
                <Wind size={32} strokeWidth={1.2} className="animate-pulse" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-border text-kyn-caramel-500 shadow-sm">
                <Sun size={14} />
              </div>
            </div>
          </div>
          
          <h1 className="font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl italic">
            Lifestyle
          </h1>
          <p className="mt-8 font-ui text-lg leading-relaxed text-text-secondary md:text-xl max-w-2xl mx-auto">
            A space for tools that don't just solve problems, but elevate the 
            rhythm of your day. Designed for the modern aesthete.
          </p>
        </div>
      </header>

      {/* The Collection Matrix */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 flex items-center justify-between border-b border-kyn-caramel-100 pb-8">
            <div className="flex items-center gap-3">
              <Coffee className="text-kyn-caramel-500" size={18} />
              <h2 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-text-primary">
                The Curation
              </h2>
            </div>
            <span className="font-ui text-[11px] font-bold uppercase tracking-widest text-kyn-caramel-600 bg-kyn-caramel-50 px-3 py-1 rounded-full">
              {products?.length || 0} Assets
            </span>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as Product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center rounded-kynar border-2 border-dashed border-kyn-caramel-100 bg-kyn-caramel-50/20">
              <Sparkles className="mb-4 text-kyn-caramel-300" size={32} strokeWidth={1} />
              <p className="font-ui text-sm text-text-secondary italic">
                The Lifestyle sector is currently being refined.<br />
                New arrivals are being harmonized.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Philosophy Callout: Section 19.2 */}
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
          <div className="mt-10 flex justify-center gap-1.5">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-1.5 w-1.5 rounded-full bg-kyn-caramel-200" />
             ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
