import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ArrowRight, Globe, Shield, Sparkles } from "lucide-react";
import { Product } from "@/lib/supabase/types";

export default async function HomePage() {
  const supabase = await createClient();
  
  // Safe-fetch with null fallback to ensure the page renders even without DB connection
  let featuredProducts: Product[] = [];
  try {
    const { data } = await supabase
      .from("products")
      .select("*")
      .limit(3)
      .order('created_at', { ascending: false });
    featuredProducts = (data as Product[]) || [];
  } catch (err) {
    console.error("Home fetch error:", err);
  }

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-32 animate-in fade-in duration-1000">
      
      {/* HERO SECTION */}
      <section className="relative px-gutter pt-20 pb-12 text-center md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-surface border border-border px-4 py-1.5 font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
              <Sparkles size={12} className="text-kyn-green-600" />
              Established in the UK
            </div>
          </div>

          <h1 className="font-brand text-4xl font-bold tracking-tight text-kyn-slate-900 sm:text-6xl md:text-8xl lg:text-9xl leading-[1.1]">
            A Universe of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kyn-slate-900 via-kyn-slate-600 to-kyn-slate-900">
              Digital Permanence.
            </span>
          </h1>

          <p className="mt-8 font-ui text-base text-text-secondary leading-relaxed md:text-xl max-w-2xl mx-auto px-4">
            Professional-grade digital tools and assets designed to be acquired once, owned forever, and used across a lifetime.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row px-6">
            <Link 
              href="/store" 
              className="w-full sm:w-auto px-8 py-4 bg-kyn-slate-900 text-white font-brand font-bold rounded-kynar hover:bg-kyn-slate-800 calm-transition shadow-lg active:scale-[0.96]"
            >
              Explore the Hub
            </Link>
            <Link 
              href="/library" 
              className="w-full sm:w-auto px-8 py-4 bg-white border border-border text-kyn-slate-900 font-brand font-bold rounded-kynar hover:bg-surface calm-transition active:scale-[0.96]"
            >
              Enter Library
            </Link>
          </div>
        </div>
      </section>

      {/* PORTAL SECTION */}
      <section className="px-gutter">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <WorldCard 
              href="/home-world" 
              title="Home World" 
              desc="Cultivate your physical space with digital order."
              icon={<Globe size={24} />}
              colorClass="bg-kyn-green-50 text-kyn-green-600"
              hoverBorder="hover:border-kyn-green-200"
            />
            <WorldCard 
              href="/lifestyle-world" 
              title="Lifestyle World" 
              desc="Design your daily presence and digital flow."
              icon={<Sparkles size={24} />}
              colorClass="bg-kyn-caramel-50 text-kyn-caramel-600"
              hoverBorder="hover:border-kyn-caramel-200"
            />
            <WorldCard 
              href="/tools-world" 
              title="Tools World" 
              desc="Engineered assets for professional utility."
              icon={<Shield size={24} />}
              colorClass="bg-kyn-slate-100 text-kyn-slate-600"
              hoverBorder="hover:border-kyn-slate-200"
            />
          </div>
        </div>
      </section>

      {/* ARRIVALS SECTION */}
      {featuredProducts.length > 0 && (
        <section className="px-gutter bg-surface py-24 border-y border-border">
          <div className="mx-auto max-w-screen-xl">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-brand text-2xl md:text-3xl font-bold text-kyn-slate-900">Latest Acquisitions</h2>
                <p className="font-ui text-sm text-text-secondary mt-1">New additions to the Kynar ecosystem.</p>
              </div>
              <Link href="/store" className="hidden sm:block font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors">
                Browse All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MANIFESTO */}
      <section className="px-gutter text-center py-12">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <div className="h-px w-8 bg-kyn-green-500" />
          <h2 className="font-brand text-2xl font-bold text-kyn-slate-900">A New Digital Contract</h2>
          <p className="font-ui text-base text-text-secondary leading-relaxed italic px-4">
            &quot;In an age of ephemeral subscriptions, Kynar stands for the permanent. We believe your digital tools should be as enduring as the physical ones on your desk.&quot;
          </p>
          <div className="font-ui text-[9px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400 flex flex-wrap justify-center gap-4">
            <span>No Subscriptions</span>
            <span className="opacity-30">•</span>
            <span>No Cloud Lock-in</span>
            <span className="opacity-30">•</span>
            <span>UK Owned</span>
          </div>
        </div>
      </section>
    </div>
  );
}

interface WorldCardProps {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorClass: string;
  hoverBorder: string;
}

// Reusable Sub-component for clarity
function WorldCard({ href, title, desc, icon, colorClass, hoverBorder }: WorldCardProps) {
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-[1.5rem] border border-border bg-white p-8 calm-transition ${hoverBorder} hover:shadow-kynar-soft`}>
      <div className={`mb-12 flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}>
        {icon}
      </div>
      <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">{title}</h3>
      <p className="mt-3 font-ui text-sm text-text-secondary leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center gap-2 font-brand text-[10px] font-bold uppercase tracking-widest text-kyn-slate-900 opacity-60 group-hover:opacity-100 transition-opacity">
        Enter Domain <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
