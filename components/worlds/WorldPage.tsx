/**
 * KYNAR UNIVERSE: Shared WorldPage Component (v3.1)
 * Refactor: Modularized hero, grid, empty state, and footer sections for clarity.
 */

import { type LucideIcon } from "lucide-react";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Product } from "@/lib/supabase/types";

export interface WorldConfig {
  metadata: { title: string;description: string };
  breadcrumbLabel: string;
  breadcrumbHref: string;
  hero: {
    primaryIcon: LucideIcon;
    primaryIconClasses: string;
    accentIcon: LucideIcon;
    accentIconClasses: string;
    iconAnimation ? : string;
    title: string;
    titleClasses ? : string;
    description: string;
  };
  grid: {
    icon: LucideIcon;
    iconClasses ? : string;
    sectionTitle: string;
    countLabel: string;
  };
  emptyState: {
    icon: LucideIcon;
    iconClasses: string;
    message: string;
    subMessage: string;
    messageClasses ? : string;
  };
  footer: {
    bgClasses: string;
    icon: LucideIcon;
    iconClasses: string;
    title: string;
    titleClasses ? : string;
    quote: string;
    quoteClasses ? : string;
  };
}

interface WorldPageProps {
  config: WorldConfig;
  products: Product[];
  error ? : string | null;
}

// --- Subcomponents ---

const HeroSection = ({ hero }: WorldConfig["hero"]) => {
  const PrimaryIcon = hero.primaryIcon;
  const AccentIcon = hero.accentIcon;
  
  return (
    <header className="px-gutter pt-16 pb-20 text-center md:pt-28 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex justify-center">
          <div className={`relative ${hero.iconAnimation ? "group" : ""}`}>
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full shadow-kynar-soft transition-all duration-500 ${hero.primaryIconClasses} ${hero.iconAnimation || "hover:scale-105"}`}
            >
              <PrimaryIcon size={32} strokeWidth={1.5} />
            </div>
            <div
              className={`absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm ${hero.accentIconClasses}`}
            >
              <AccentIcon size={14} />
            </div>
          </div>
        </div>

        <h1 className={`font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl ${hero.titleClasses || ""}`}>
          {hero.title}
        </h1>
        <p className="mt-8 font-ui text-lg leading-relaxed text-text-secondary md:text-xl">
          {hero.description}
        </p>
      </div>
    </header>
  );
};

const GridSection = ({ grid, products, emptyState }: Pick < WorldConfig, "grid" | "emptyState" > & { products: Product[] }) => {
  const GridIcon = grid.icon;
  const EmptyIcon = emptyState.icon;
  
  return (
    <section className="px-gutter">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <GridIcon size={18} strokeWidth={2} className={grid.iconClasses} />
            <h2 className="font-brand text-sm font-bold uppercase tracking-[0.2em] text-text-primary">
              {grid.sectionTitle}
            </h2>
          </div>
          <span className="font-ui text-[11px] font-bold uppercase tracking-widest text-text-secondary">
            {products.length} {grid.countLabel}
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center py-32 text-center rounded-[2rem] border-2 border-dashed border-border bg-surface/40 ${emptyState.messageClasses || ""}`}>
            <EmptyIcon className={`mb-4 ${emptyState.iconClasses}`} size={32} strokeWidth={1} />
            <p className="font-ui text-sm text-text-secondary">
              {emptyState.message}
              <br />
              {emptyState.subMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const FooterSection = ({ footer }: WorldConfig["footer"]) => {
  const FooterIcon = footer.icon;
  
  return (
    <footer className={`mt-40 px-gutter py-24 ${footer.bgClasses}`}>
      <div className="mx-auto max-w-2xl text-center">
        <div className={`mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${footer.iconClasses}`}>
          <FooterIcon size={20} />
        </div>
        <h3 className={`font-brand text-2xl font-bold text-text-primary ${footer.titleClasses || ""}`}>
          {footer.title}
        </h3>
        <blockquote className={`mt-6 font-ui text-base leading-loose text-text-secondary ${footer.quoteClasses || ""}`}>
          {footer.quote}
        </blockquote>
      </div>
    </footer>
  );
};

// --- Main Component ---

export function WorldPage({ config, products, error }: WorldPageProps) {
  const { breadcrumbLabel, breadcrumbHref, hero, grid, emptyState, footer } = config;
  
  if (error) {
    console.error(`[${breadcrumbLabel}] Database Fetch Error:`, error);
  }
  
  const breadcrumbPaths = [
    { label: "Universe Hub", href: "/" },
    { label: breadcrumbLabel, href: breadcrumbHref },
  ];
  
  return (
    <main className="min-h-screen bg-canvas pb-safe-bottom animate-in fade-in duration-700">
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      <HeroSection {...hero} />
      <GridSection grid={grid} products={products} emptyState={emptyState} />
      <FooterSection footer={footer} />
    </main>
  );
}