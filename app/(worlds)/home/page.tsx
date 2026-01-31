import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Product } from "@/types/supabase";
import { Compass, Sparkles, Map } from "lucide-react";

/**
 * KYNAR UNIVERSE: World Landing Page (Home)
 * Aligned with UX Canon Section 3 (World Exploration)
 * Identity: Grounded, Green, Orderly.
 */
export default async function HomeWorldPage() {
  const supabase = await createClient();
  
  // Fetch products specific to this world
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("world", "Home")
    .order("created_at", { ascending: false });

  const breadcrumbPaths = [
    { label: 'Universe Hub', href: '/' },
    { label: 'Home World', href: '/home' }
  ];

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <Breadcrumbs paths={breadcrumbPaths} />

      {/* Narrative Hero - Design System Section 4 */}
      <header className="px-gutter pt-16 pb-24 text-center md:pt-32 md:pb-40">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <span className="flex items-center gap-2 rounded-full bg-kyn-green-50/50 border border-kyn-green-100 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-kyn-green-700">
              <Compass size={12} className="animate-subtle-float" />
              The Domain of Order
            </span>
          </div>

          <h1 className="font-brand text-5xl font-bold tracking-tight text-kyn-slate-900 md:text-8xl">
            Cultivate your <span className="text-kyn-green-600">Physical Space.</span>
          </h1>

          <p className="mt-10 font-ui text-lg text-text-secondary leading-relaxed md:text-2xl max-w-2xl mx-auto opacity-90">
            A curated selection of digital tools designed to bring clarity, rhythm, and permanence to your home environment.
          </p>
        </div>
      </header>

      {/* World Philosophy - UX Canon 3.2 */}
      <section className="px-gutter mb-32">
        <div className="mx-auto max-w-screen-xl grid gap-gutter md:grid-cols-3">
          <div className="kynar-card bg-surface/30">
            <Sparkles className="text-kyn-green-600 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Quiet Utility</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Tools that don't demand attention, but reward it. Built for specific, tangible outcomes.
            </p>
          </div>
          <div className="kynar-card bg-surface/30">
            <Map className="text-kyn-green-600 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Digital Permanence</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              No cloud lock-in. Your files, your space, your rules. Forever yours once acquired.
            </p>
          </div>
          <div className="kynar-card bg-surface/30">
            <Compass className="text-kyn-green-600 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Mindful Rhythm</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Designed to integrate with the natural ebb and flow of a well-ordered home life.
            </p>
          </div>
        </div>
      </section>

      {/* Product Discovery Loop - Section 11 */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
            <h2 className="font-brand text-2xl font-bold text-kyn-slate-900">Available Assets</h2>
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-kyn-slate-400">
              {products?.length || 0} Professional Tools
            </span>
          </div>

          <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>

          {(!products || products.length === 0) && (
            <div className="py-24 text-center border-2 border-dashed border-border rounded-kynar bg-surface/50">
              <p className="font-ui text-sm text-text-secondary">The Home World is currently being curated.</p>
            </div>
          )}
        </div>
      </section>

      {/* World Footer Narrative */}
      <footer className="mt-40 px-gutter py-24 bg-surface border-t border-border text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">The Kynar Promise</h3>
          <p className="mt-6 font-ui text-base text-text-secondary leading-relaxed">
            Every tool in the Home World is strictly curated for durability and utility. We believe your digital home should be as sturdy and reliable as your physical one.
          </p>
        </div>
      </footer>
    </div>
  );
}
