/**
 * KYNAR UNIVERSE: World Landing (Tools) v2.0
 * Fully aligned with canonical types.ts and Supabase v2.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Cpu, Zap, Hammer, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Tools World | Kynar Technical Hub",
  description: "High-performance digital assets engineered for speed and reliability.",
};

export default async function ToolsWorldPage() {
  const supabase = await createClient();
  
  // 1. Data Retrieval with explicit casting for Supabase v2
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("world", "Tools")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("[Tools World] Database Error:", error.message);
  }
  
  // Strongly type products using the alias from types.ts
  const products = (data as Product[]) ?? [];
  
  const breadcrumbPaths = [
    { label: "Universe Hub", href: "/" },
    { label: "Tools Sector", href: "/tools" },
  ];
  
  return (
    <main className="min-h-screen bg-canvas pb-safe-bottom animate-in fade-in duration-700">
      {/* Handrail: Structural Context */}
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Narrative Hero: Technical Identity */}
      <header className="px-gutter pt-16 pb-20 text-center md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex justify-center">
            <div className="relative group">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-kyn-slate-900 text-white shadow-2xl transition-all duration-500 group-hover:scale-105">
                <Cpu size={32} strokeWidth={1.5} className="animate-pulse" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-kyn-green-500 text-white shadow-sm border-2 border-canvas">
                <Zap size={12} fill="currentColor" />
              </div>
            </div>
          </div>
          
          <h1 className="font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl uppercase">
            Tools World
          </h1>
          <p className="mt-8 font-ui text-lg leading-relaxed text-text-secondary md:text-xl">
            A technical sector for high-leverage components. Engineered for 
            professionals who require architectural stability in their digital stack.
          </p>
        </div>
      </header>

      {/* Product Matrix */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <Hammer size={18} className="text-kyn-slate-400" />
              <h2 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-text-primary">
                Technical Repository
              </h2>
            </div>
            <span className="font-ui text-[11px] font-bold uppercase tracking-widest text-text-secondary">
              {products.length} Assets Indexed
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-border rounded-[2rem] bg-surface/50">
              <p className="font-ui text-sm text-kyn-slate-400 italic">
                The technical repository is currently being indexed.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Standards Footer */}
      <footer className="mt-40 px-gutter py-24 bg-kyn-slate-900 text-white text-center rounded-t-[3rem] shadow-2xl">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck className="mx-auto mb-8 text-kyn-green-400" size={32} strokeWidth={1} />
          <h3 className="font-brand text-2xl font-bold uppercase tracking-widest">Kynar Standards</h3>
          <p className="mt-6 font-ui text-sm text-kyn-slate-400 leading-relaxed max-w-md mx-auto italic">
            "Performance is the baseline. Autonomy is the goal."
          </p>
        </div>
      </footer>
    </main>
  );
}
