/**
 * KYNAR UNIVERSE: World Landing (Home) v1.5
 * Role: Sector-specific discovery for domestic and personal organization tools.
 * Alignment: Design System Section 12 (Worlds) & UX Canon Section 3.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Home as HomeIcon, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { Database } from "@/lib/supabase/types";

// Type-safety for the product row
type Product = Database['public']['Tables']['products']['Row'];

export const metadata: Metadata = {
  title: "Home World | Kynar Universe",
  description: "Curated tools for domestic order and personal sanctuary management.",
};

export default async function HomeWorldPage() {
  const supabase = await createClient();
  
  // 1. Fetching Grounded Data (Server-Side)
  // Filtering strictly for the 'Home' world as per sector requirements
  const { data: products, error } = await supabase
    ?.from("products")
    .select("*")
    .eq("world", "Home")
    .eq("is_published", true)
    .order("created_at", { ascending: false }) ?? { data: [], error: null };

  const breadcrumbPaths = [
    { label: 'Universe Hub', href: '/store' },
    { label: 'Home World', href: '/home', colorClass: 'text-kyn-green-600' }
  ];

  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-1000 ease-out">
      {/* Handrail: UX Canon 2.2 */}
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Narrative Hero: Design System Section 4 */}
      <header className="px-gutter pt-16 pb-20 text-center md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-kyn-green-50 border border-kyn-green-100 text-kyn-green-600 shadow-kynar-soft">
                <HomeIcon size={32} strokeWidth={1.5} />
              </div>
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-border text-kyn-green-500 shadow-sm">
                <Leaf size={14} />
              </div>
            </div>
          </div>
          
          <h1 className="font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
            The Home World
          </h1>
          <p className="mt-8 font-ui text-lg leading-relaxed text-text-secondary md:text-xl">
            A curated sector for the architecture of daily life. From domestic 
            inventory to family legacy planning—tools built for permanence.
          </p>
        </div>
      </header>

      {/* Grid Controls: Design System Section 12.4 */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-kyn-green-500" />
              <h2 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-text-primary">
                The Collection
              </h2>
            </div>
            <span className="font-ui text-[11px] font-bold uppercase tracking-widest text-text-secondary">
              {products?.length || 0} Assets Available
            </span>
          </div>

          {/* Responsive Product Matrix */}
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as Product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center rounded-kynar border-2 border-dashed border-border bg-surface/40">
              <Sparkles className="mb-4 text-kyn-slate-300" size={32} strokeWidth={1} />
              <p className="font-ui text-sm text-text-secondary">
                The Home World is currently being harmonized.<br />
                New additions arriving soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* World Philosophy: Business Reference Section 19 */}
      <footer className="mt-40 bg-surface border-t border-border px-gutter py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border border-border text-kyn-green-600 shadow-sm">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-brand text-2xl font-bold text-text-primary">The Kynar Promise</h3>
          <p className="mt-6 font-ui text-base leading-loose text-text-secondary italic">
            "We believe the digital foundation of your home should be as stable as 
            the physical one. Every tool here is selected for its lack of noise 
            and its commitment to your long-term autonomy."
          </p>
          <div className="mt-10 flex justify-center gap-2">
             <div className="h-1 w-1 rounded-full bg-kyn-green-300" />
             <div className="h-1 w-1 rounded-full bg-kyn-green-400" />
             <div className="h-1 w-1 rounded-full bg-kyn-green-500" />
          </div>
        </div>
      </footer>
    </main>
  );
}
