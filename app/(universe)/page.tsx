/**
 * KYNAR UNIVERSE: The Universe Gate (v1.5)
 * Role: The primary entry point and world-selection portal.
 * Optimization: Mobile-first ergonomic grid & Next.js 15 Server-First architecture.
 */

import Link from "next/link";
import { Sparkles, ArrowRight, Globe, Compass, Box } from "lucide-react";

export default function UniverseGate() {
  const worlds = [
    { 
      name: "Home", 
      slug: "home", 
      color: "bg-kyn-green-500", 
      icon: <Box size={20} />,
      desc: "Order in your physical space and domestic architecture." 
    },
    { 
      name: "Lifestyle", 
      slug: "lifestyle", 
      color: "bg-kyn-caramel-500", 
      icon: <Sparkles size={20} />,
      desc: "Refined daily routines and personal digital sophistication." 
    },
    { 
      name: "Tools", 
      slug: "tools", 
      color: "bg-kyn-slate-500", 
      icon: <Compass size={20} />,
      desc: "High-performance clarity for your professional projects." 
    },
  ];

  return (
    <main className="relative flex min-h-[90vh] flex-col items-center justify-center px-gutter py-12 md:py-24 overflow-hidden">
      {/* Design System Section 11: Atmospheric Background Element */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kyn-green-50/30 blur-[120px]" />

      {/* Brand Header: Narrative Design Section 4 */}
      <header className="text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 shadow-sm">
            <Globe size={14} className="text-kyn-green-500 animate-spin-slow" />
            <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
              Central Hub Active
            </span>
          </div>
        </div>

        <h1 className="font-brand text-5xl font-bold tracking-tight text-kyn-slate-900 md:text-7xl lg:text-8xl">
          Kynar <span className="text-text-secondary font-medium italic">Universe</span>
        </h1>
        
        <p className="mt-8 mx-auto max-w-lg text-lg text-text-secondary font-ui leading-relaxed md:text-xl">
          A calm digital ecosystem for useful tools that help you 
          <span className="text-kyn-slate-900 font-medium"> organise, reflect, and create.</span>
        </p>
      </header>

      {/* World Selection Grid: UX Canon Section 3 */}
      <nav className="mt-16 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        <div className="grid gap-6 md:grid-cols-3">
          {worlds.map((world) => (
            <Link 
              key={world.slug} 
              href={`/${world.slug}`}
              className="group relative flex flex-col items-start rounded-3xl border border-border bg-white p-8 text-left transition-all hover:border-kyn-green-400/50 hover:shadow-kynar-soft active:scale-[0.97]"
            >
              {/* Decorative Accent */}
              <div className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl ${world.color} text-white shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                {world.icon}
              </div>
              
              <h3 className="font-brand text-2xl font-bold text-kyn-slate-900">
                {world.name}
              </h3>
              
              <p className="mt-3 font-ui text-sm leading-relaxed text-text-secondary">
                {world.desc}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-kyn-slate-400 group-hover:text-kyn-green-600 transition-colors">
                Explore World 
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Secondary Discovery: Business Reference Section 12 */}
      <footer className="mt-20 flex flex-col items-center gap-6 animate-in fade-in duration-1000 delay-500">
        <div className="h-px w-12 bg-border" />
        <Link 
          href="/store" 
          className="group flex items-center gap-3 font-brand text-sm font-bold uppercase tracking-[0.25em] text-text-secondary hover:text-kyn-green-600 transition-colors"
        >
          Browse the Marketplace
          <span className="h-px w-0 bg-kyn-green-600 transition-all group-hover:w-8" />
        </Link>
      </footer>
    </main>
  );
}
