import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Product } from "@/types/supabase";
import { Cpu, Box, Zap, Hammer } from "lucide-react";

/**
 * KYNAR UNIVERSE: World Landing Page (Tools)
 * Aligned with UX Canon Section 3 (World Exploration)
 * Identity: Technical, High-Performance, Structural.
 */
export default async function ToolsWorldPage() {
  const supabase = await createClient();
  
  // Fetch products specific to the Tools world
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("world", "Tools")
    .order("created_at", { ascending: false });

  const breadcrumbPaths = [
    { label: 'Universe Hub', href: '/' },
    { label: 'Tools World', href: '/tools' }
  ];

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <Breadcrumbs paths={breadcrumbPaths} />

      {/* Narrative Hero - Technical Authority */}
      <header className="px-gutter pt-16 pb-24 text-center md:pt-32 md:pb-40 relative">
        {/* Subtle Technical Grid Overlay - Design System 11 */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#64748b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <span className="flex items-center gap-2 rounded-md bg-kyn-slate-100 border border-kyn-slate-200 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-kyn-slate-600">
              <Cpu size={12} className="animate-pulse" />
              The Utility Engine
            </span>
          </div>

          <h1 className="font-brand text-5xl font-bold tracking-tight text-kyn-slate-900 md:text-8xl">
            Engineer your <span className="text-kyn-slate-500">Digital Edge.</span>
          </h1>

          <p className="mt-10 font-ui text-lg text-text-secondary leading-relaxed md:text-2xl max-w-2xl mx-auto opacity-90">
            High-performance assets built for builders. Professional-grade digital components designed for speed, reliability, and seamless integration.
          </p>
        </div>
      </header>

      {/* World Philosophy - Structural Value Cards */}
      <section className="px-gutter mb-32">
        <div className="mx-auto max-w-screen-xl grid gap-gutter md:grid-cols-3">
          <div className="kynar-card border-kyn-slate-200 bg-white shadow-sm">
            <Zap className="text-kyn-slate-900 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Maximum Velocity</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Optimized for immediate deployment. Our tools are stripped of bloat to ensure they perform at the highest levels of digital efficiency.
            </p>
          </div>
          <div className="kynar-card border-kyn-slate-200 bg-white shadow-sm">
            <Box className="text-kyn-slate-900 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Structural Integrity</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Standardized file formats and clean metadata. Built to work in harmony with your existing professional software stacks.
            </p>
          </div>
          <div className="kynar-card border-kyn-slate-200 bg-white shadow-sm">
            <Hammer className="text-kyn-slate-900 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Built to Last</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              No planned obsolescence. These tools are yours to keep, refine, and use across a lifetime of professional projects.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Anchor */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-between mb-12 border-b-2 border-kyn-slate-900 pb-8">
            <h2 className="font-brand text-2xl font-bold text-kyn-slate-900">Standard Components</h2>
            <div className="flex items-center gap-3">
               <span className="h-2 w-2 rounded-full bg-kyn-green-500 animate-pulse" />
               <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
                System Active: {products?.length || 0} Assets
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>

          {(!products || products.length === 0) && (
            <div className="py-24 text-center border-2 border-kyn-slate-100 rounded-kynar bg-canvas">
              <p className="font-ui text-sm text-kyn-slate-400 italic">The Technical Repository is currently being indexed.</p>
            </div>
          )}
        </div>
      </section>

      {/* Technical Footer Narrative */}
      <footer className="mt-40 px-gutter py-24 bg-kyn-slate-900 text-white text-center rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center opacity-30">
            <div className="h-px w-20 bg-white" />
          </div>
          <h3 className="font-brand text-2xl font-bold">Kynar Technical Standards</h3>
          <p className="mt-6 font-ui text-sm text-kyn-slate-400 leading-relaxed max-w-md mx-auto">
            Our tools are engineered in the UK to international professional standards. Performance is not a feature; it is our baseline.
          </p>
          <div className="mt-12 flex justify-center gap-4">
             <div className="h-1 w-1 rounded-full bg-white opacity-20" />
             <div className="h-1 w-1 rounded-full bg-white opacity-20" />
             <div className="h-1 w-1 rounded-full bg-white opacity-20" />
          </div>
        </div>
      </footer>
    </div>
  );
}
