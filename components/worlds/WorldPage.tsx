import { Metadata } from "next";
import { type LucideIcon } from "lucide-react";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Product } from "@/lib/supabase/types";

export interface WorldConfig {
  // Metadata
  metadata: {
    title: string;
    description: string;
  };

  // Breadcrumbs
  breadcrumbLabel: string;
  breadcrumbHref: string;

  // Hero section
  hero: {
    primaryIcon: LucideIcon;
    primaryIconClasses: string; // e.g., "bg-kyn-green-50 border-kyn-green-100 text-kyn-green-600"
    accentIcon: LucideIcon;
    accentIconClasses: string; // e.g., "bg-white border-border text-kyn-green-500"
    iconAnimation?: string; // Optional: e.g., "group-hover:rotate-12"
    title: string;
    titleClasses?: string; // Optional: e.g., "italic" or "uppercase"
    description: string;
  };

  // Grid section
  grid: {
    icon: LucideIcon;
    iconClasses?: string;
    sectionTitle: string;
    countLabel: string; // e.g., "Assets Available" or "Objects Harmonized"
  };

  // Empty state
  emptyState: {
    icon: LucideIcon;
    iconClasses: string;
    message: string;
    subMessage: string;
    messageClasses?: string; // Optional: e.g., "italic"
  };

  // Footer
  footer: {
    bgClasses: string; // e.g., "bg-surface border-t border-border"
    icon: LucideIcon;
    iconClasses: string;
    title: string;
    titleClasses?: string; // Optional: e.g., "italic"
    quote: string;
    quoteClasses?: string; // Optional: e.g., "italic"
  };
}

interface WorldPageProps {
  config: WorldConfig;
  products: Product[];
  error?: string | null;
}

export function WorldPage({ config, products, error }: WorldPageProps) {
  const {
    breadcrumbLabel,
    breadcrumbHref,
    hero,
    grid,
    emptyState,
    footer,
  } = config;

  const PrimaryIcon = hero.primaryIcon;
  const AccentIcon = hero.accentIcon;
  const GridIcon = grid.icon;
  const EmptyIcon = emptyState.icon;
  const FooterIcon = footer.icon;

  const breadcrumbPaths = [
    { label: "Universe Hub", href: "/" },
    { label: breadcrumbLabel, href: breadcrumbHref },
  ];

  if (error) {
    console.error(`[${breadcrumbLabel}] Database Fetch Error:`, error);
  }

  return (
    <main className="min-h-screen bg-canvas pb-safe-bottom animate-in fade-in duration-700">
      {/* Handrail: Top-level navigation context */}
      <div className="px-gutter pt-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Narrative Hero: Focused Sector Identity */}
      <header className="px-gutter pt-16 pb-20 text-center md:pt-28 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex justify-center">
            <div className={`relative ${hero.iconAnimation ? 'group' : ''}`}>
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full shadow-kynar-soft transition-all duration-500 ${hero.primaryIconClasses} ${
                  hero.iconAnimation || 'hover:scale-105'
                }`}
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

          <h1
            className={`font-brand text-4xl font-bold tracking-tight text-text-primary md:text-6xl ${
              hero.titleClasses || ''
            }`}
          >
            {hero.title}
          </h1>
          <p className="mt-8 font-ui text-lg leading-relaxed text-text-secondary md:text-xl">
            {hero.description}
          </p>
        </div>
      </header>

      {/* Grid Controls */}
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

          {/* Optimized Product Matrix */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center py-32 text-center rounded-[2rem] border-2 border-dashed border-border bg-surface/40 ${
                emptyState.messageClasses || ''
              }`}
            >
              <EmptyIcon
                className={`mb-4 ${emptyState.iconClasses}`}
                size={32}
                strokeWidth={1}
              />
              <p className="font-ui text-sm text-text-secondary">
                {emptyState.message}
                <br />
                {emptyState.subMessage}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* World Philosophy Footer */}
      <footer className={`mt-40 px-gutter py-24 ${footer.bgClasses}`}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={`mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${footer.iconClasses}`}>
            <FooterIcon size={20} />
          </div>
          <h3 className={`font-brand text-2xl font-bold text-text-primary ${footer.titleClasses || ''}`}>
            {footer.title}
          </h3>
          <blockquote className={`mt-6 font-ui text-base leading-loose text-text-secondary ${footer.quoteClasses || ''}`}>
            {footer.quote}
          </blockquote>
        </div>
      </footer>
    </main>
  );
}