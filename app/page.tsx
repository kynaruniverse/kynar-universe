import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ArrowRight, Globe, Shield, Sparkles } from "lucide-react";

/**
 * KYNAR UNIVERSE: The Grand Entrance
 * Aligned with UX Canon Section 2 & Business Reference Section 7
 * Identity: Earthy-Cosmic, Portal-based, Calm Authority.
 */
export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch a curated selection for the Discovery Loop
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .limit(3)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-32 pb-32 animate-in fade-in duration-1000">
      
      {/* 1. The Cosmic Hero - Design System Section 4 */}
      <section className="relative px-gutter pt-24 pb-12 text-center md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400">
              <Sparkles size={12} className="text-kyn-green-600" />
              Established in the UK
            </div>
          </div>

          <h1 className="font-brand text-5xl font-bold tracking-tight text-kyn-slate-900 md:text-8xl lg:text-9xl">
            A Universe of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kyn-slate-900 via-kyn-slate-600 to-kyn-slate-900">
              Digital Permanence.
            </span>
          </h1>

          <p className="mt-12 font-ui text-lg text-text-secondary leading-relaxed md:text-2xl max-w-2xl mx-auto opacity-80">
            Professional-grade digital tools and assets designed to be acquired once, owned forever, and used across a lifetime.
          </p>

          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/store" 
              className="w-full sm:w-auto px-10 py-5 bg-kyn-slate-900 text-white font-brand font-bold rounded-kynar hover:bg-kyn-slate-800 calm-transition shadow-kynar-soft active:scale-[0.98]"
            >
              Explore the Hub
            </Link>
            <Link 
              href="/library" 
              className="w-full sm:w-auto px-10 py-5 bg-white border border-border text-kyn-slate-900 font-brand font-bold rounded-kynar hover:bg-surface calm-transition active:scale-[0.98]"
            >
              Enter Library
            </Link>
          </div>
        </div>
      </section>

      {/* 2. The Three Worlds Portal - UX Canon Section 3 */}
      
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            
            {/* Home World */}
            <Link href="/home-world" className="group relative overflow-hidden rounded-[2rem] border border-border bg-white p-10 calm-transition hover:border-kyn-green-200 hover:shadow-kynar-soft">
              <div className="mb-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-green-50 text-kyn-green-600">
                <Globe size={24} />
              </div>
              <h3 className="font-brand text-3xl font-bold text-kyn-slate-900">Home World</h3>
              <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">Cultivate your physical space with digital order.</p>
              <div className="mt-8 flex items-center gap-2 font-brand text-xs font-bold uppercase tracking-widest text-kyn-green-600">
                Enter Domain <ArrowRight size={14} className="group-hover:translate-x-1 calm-transition" />
              </div>
            </Link>

            {/* Lifestyle World */}
            <Link href="/lifestyle-world" className="group relative overflow-hidden rounded-[2rem] border border-border bg-white p-10 calm-transition hover:border-kyn-caramel-200 hover:shadow-kynar-soft">
              <div className="mb-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-caramel-50 text-kyn-caramel-600">
                <Sparkles size={24} />
              </div>
              <h3 className="font-brand text-3xl font-bold text-kyn-slate-900">Lifestyle World</h3>
              <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">Design your daily presence and digital flow.</p>
              <div className="mt-8 flex items-center gap-2 font-brand text-xs font-bold uppercase tracking-widest text-kyn-caramel-600">
                Enter Domain <ArrowRight size={14} className="group-hover:translate-x-1 calm-transition" />
              </div>
            </Link>

            {/* Tools World */}
            <Link href="/tools-world" className="group relative overflow-hidden rounded-[2rem] border border-border bg-white p-10 calm-transition hover:border-kyn-slate-200 hover:shadow-kynar-soft">
              <div className="mb-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-kyn-slate-100 text-kyn-slate-600">
                <Shield size={24} />
              </div>
              <h3 className="font-brand text-3xl font-bold text-kyn-slate-900">Tools World</h3>
              <p className="mt-4 font-ui text-sm text-text-secondary leading-relaxed">Engineered assets for professional utility.</p>
              <div className="mt-8 flex items-center gap-2 font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-900">
                Enter Domain <ArrowRight size={14} className="group-hover:translate-x-1 calm-transition" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. Latest Arrivals - The Discovery Loop */}
      <section className="px-gutter bg-surface py-32 border-y border-border">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-brand text-3xl font-bold text-kyn-slate-900">Latest Acquisitions</h2>
              <p className="font-ui text-sm text-text-secondary mt-2">New additions to the Kynar ecosystem.</p>
            </div>
            <Link href="/store" className="font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 calm-transition">
              Browse Hub
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-inner sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Kynar Manifesto - Business Canon Section 1 */}
      <section className="px-gutter text-center py-20">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-8">
          <div className="h-px w-12 bg-kyn-green-500" />
          <h2 className="font-brand text-3xl font-bold text-kyn-slate-900">A New Digital Contract</h2>
          <p className="font-ui text-base text-text-secondary leading-loose italic">
            "In an age of ephemeral subscriptions, Kynar stands for the permanent. We believe your digital tools should be as enduring as the physical ones on your desk."
          </p>
          <p className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400">
            No Subscriptions • No Cloud Lock-in • UK Owned
          </p>
        </div>
      </section>

    </div>
  );
}
