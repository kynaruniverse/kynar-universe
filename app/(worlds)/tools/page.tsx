/**
 * KYNAR UNIVERSE: World Landing (Tools) v1.5
 * Role: Technical repository for professional digital components.
 * Identity: Tactical, High-Performance, Structural.
 * Optimization: Next.js 15 Async & Mobile-First "Safe Area" Design.
 */

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Cpu, Box, Zap, Hammer, ShieldCheck } from "lucide-react";
import { Database } from "@/lib/supabase/types";

// Type-safe row extraction for robust deployment
type Product = Database['public']['Tables']['products']['Row'];

export const metadata: Metadata = {
  title: "Tools World | Kynar Technical Hub",
  description: "High-performance digital assets engineered for speed and reliability.",
};

export default async function ToolsWorldPage() {
  const supabase = await createClient();
  
  // 1. Sector-Specific Data Retrieval
  const { data: products, error } = await supabase
    ?.from("products")
    .select("*")
    .eq("world", "Tools")
    .eq("is_published", true)
    .order("created_at", { ascending: false }) ?? { data: [], error: null };

  const breadcrumbPaths = [
    { label: 'Universe Hub', href: '/store' },
    { label: 'Tools Sector', href: '/tools', colorClass: 'text-kyn-slate-600' }
  ];

  if (error) {
    console.error("[ToolsWorld] Technical indexing failed:", error);
  }

  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-700">
      {/* Handrail: UX Canon 2.2 */}
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Narrative Hero: Technical Authority */}
      <header className="px-gutter pt-16 pb-24 text-center md:pt-32 md:pb-40 relative overflow-hidden">
        {/* Design System 11: Technical Grid Overlay */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none select-none" 
             style={{ 
               backgroundImage: 'radial-gradient(#0f172a 0.5px, transparent 0.5px)', 
               backgroundSize: '32px 32px' 
             }} 
        />
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <span className="flex items-center gap-2 rounded-full bg-kyn-slate-900 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-white shadow-xl">
              <Cpu size={12} className="animate-pulse text-kyn-green-400" />
              Technical Sector Active
            </span>
          </div>

          <h1 className="font-brand text-4xl font-bold tracking-tight text-kyn-slate-900 md:text-7xl lg:text-8xl">
            Engineer your <br />
            <span className="text-kyn-slate-400">Digital Edge.</span>
          </h1>

          <p className="mt-10 font-ui text-base text-text-secondary leading-relaxed md:text-xl max-w-2xl mx-auto px-4">
            Professional-grade components designed for speed, reliability, and 
            seamless integration into your architectural stack.
          </p>
        </div>
      </header>

      {/* Structural Value Matrix */}
      <section className="px-gutter mb-32">
        <div className="mx-auto max-w-screen-xl grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-border bg-white p-8 shadow-kynar-soft transition-all hover:border-kyn-slate-900">
            <Zap className="text-kyn-slate-900 mb-6 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-lg font-bold text-kyn-slate-900 uppercase tracking-tight">Maximum Velocity</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Optimized for immediate deployment. Stripped of bloat to ensure peak digital efficiency.
            </p>
          </div>
          
          <div className="group rounded-2xl border border-border bg-white p-8 shadow-kynar-soft transition-all hover:border-kyn-slate-900">
            <Box className="text-kyn-slate-900 mb-6 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-lg font-bold text-kyn-slate-900 uppercase tracking-tight">Structural Integrity</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Clean metadata and standard formats. Built for harmony with professional software stacks.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-white p-8 shadow-kynar-soft transition-all hover:border-kyn-slate-900">
            <Hammer className="text-kyn-slate-900 mb-6 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-lg font-bold text-kyn-slate-900 uppercase tracking-tight">Built to Last</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              No planned obsolescence. Digital tools designed for a lifetime of professional use.
            </p>
          </div>
        </div>
      </section>

      {/* Component Repository */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-between mb-12 border-b-2 border-kyn-slate-900 pb-8">
            <h2 className="font-brand text-xl font-bold text-kyn-slate-900 uppercase tracking-widest">Components</h2>
            <div className="flex items-center gap-3">
               <span className="h-2 w-2 rounded-full bg-kyn-green-500 animate-pulse" />
               <span className="hidden sm:inline font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
                Index: {products?.length || 0} Assets
              </span>
            </div>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as Product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-border rounded-3xl bg-surface/50">
              <p className="font-ui text-sm text-kyn-slate-400 italic">The technical repository is currently being indexed.</p>
            </div>
          )}
        </div>
      </section>

      {/* Technical Footer Narrative */}
      <footer className="mt-40 px-gutter py-24 bg-kyn-slate-900 text-white text-center rounded-t-[3rem] md:rounded-t-[5rem] shadow-2xl">
        <div className="max-w-2xl mx-auto">
          <ShieldCheck className="mx-auto mb-8 text-kyn-green-400" size={32} strokeWidth={1} />
          <h3 className="font-brand text-2xl font-bold uppercase tracking-tight">Kynar Technical Standards</h3>
          <p className="mt-6 font-ui text-sm text-kyn-slate-400 leading-relaxed max-w-md mx-auto">
            Engineered to international professional standards. In the Tools Sector, performance is our baseline.
          </p>
          <div className="mt-12 flex justify-center gap-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-1 w-1 rounded-full bg-white opacity-20" />
             ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
