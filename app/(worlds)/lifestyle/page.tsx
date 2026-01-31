import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Product } from "@/types/supabase";
import { Wind, Sun, Coffee, Sparkles } from "lucide-react";

/**
 * KYNAR UNIVERSE: World Landing Page (Lifestyle)
 * Aligned with UX Canon Section 3 & Design System Section 3
 * Identity: Warm, Fluid, Elegant.
 */
export default async function LifestyleWorldPage() {
  const supabase = await createClient();
  
  // Fetch products specific to the Lifestyle world
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("world", "Lifestyle")
    .order("created_at", { ascending: false });

  const breadcrumbPaths = [
    { label: 'Universe Hub', href: '/' },
    { label: 'Lifestyle World', href: '/lifestyle' }
  ];

  return (
    <div className="pb-32 animate-in fade-in duration-1000">
      <Breadcrumbs paths={breadcrumbPaths} />

      {/* Narrative Hero - Editorial Curation */}
      <header className="px-gutter pt-16 pb-24 text-center md:pt-32 md:pb-40">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <span className="flex items-center gap-2 rounded-full bg-kyn-caramel-50/50 border border-kyn-caramel-100 px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-kyn-caramel-700">
              <Wind size={12} className="animate-pulse duration-[4000ms]" />
              The Art of Flow
            </span>
          </div>

          <h1 className="font-brand text-5xl font-bold tracking-tight text-kyn-slate-900 md:text-8xl">
            Design your <span className="text-kyn-caramel-600">Daily Presence.</span>
          </h1>

          <p className="mt-10 font-ui text-lg text-text-secondary leading-relaxed md:text-2xl max-w-2xl mx-auto opacity-90">
            A sanctuary of digital assets for the modern aesthete. Tools for curation, reflection, and the quiet elevation of your digital lifestyle.
          </p>
        </div>
      </header>

      {/* World Philosophy - Design System Section 3 */}
      <section className="px-gutter mb-32">
        <div className="mx-auto max-w-screen-xl grid gap-gutter md:grid-cols-3">
          <div className="kynar-card bg-kyn-caramel-50/10 border-kyn-caramel-100/50">
            <Sun className="text-kyn-caramel-600 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Digital Elegance</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Assets that prioritize beauty and fluidity. Built for those who view their digital space as an extension of their personal style.
            </p>
          </div>
          <div className="kynar-card bg-kyn-caramel-50/10 border-kyn-caramel-100/50">
            <Coffee className="text-kyn-caramel-600 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Slow Tech</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Resisting the rush. Our lifestyle tools encourage a more deliberate and thoughtful engagement with your digital rituals.
            </p>
          </div>
          <div className="kynar-card bg-kyn-caramel-50/10 border-kyn-caramel-100/50">
            <Sparkles className="text-kyn-caramel-600 mb-6" size={24} strokeWidth={1.5} />
            <h3 className="font-brand text-xl font-bold text-kyn-slate-900">Curation First</h3>
            <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">
              Not more content, but better context. Tools to help you filter the noise and focus on what truly resonates.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Anchor */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-between mb-12 border-b border-border pb-8">
            <h2 className="font-brand text-2xl font-bold text-kyn-slate-900">The Collection</h2>
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-kyn-slate-400">
              {products?.length || 0} Curated Assets
            </span>
          </div>

          <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
          </div>

          {(!products || products.length === 0) && (
            <div className="py-24 text-center border-border rounded-kynar bg-surface/50 border-2 border-dashed">
              <p className="font-ui text-sm text-text-secondary italic">The Lifestyle Collection is currently being assembled.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lifestyle Reassurance */}
      <footer className="mt-40 px-gutter py-24 bg-kyn-caramel-50/30 border-t border-kyn-caramel-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-brand text-2xl font-bold text-kyn-slate-900 italic">"Simplicity is the ultimate sophistication."</h3>
          <p className="mt-6 font-ui text-sm text-kyn-caramel-800 tracking-wide uppercase font-bold">
            Permanent Tools • Zero Noise • One Universe
          </p>
        </div>
      </footer>
    </div>
  );
}
