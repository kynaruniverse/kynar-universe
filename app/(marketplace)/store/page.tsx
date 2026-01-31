/**
 * KYNAR UNIVERSE: Marketplace Hub (v1.5)
 * Role: Central discovery for all Worlds.
 * Aligned with: UX Canon Section 10 & Design System Section 5.
 */

import { getFilteredProducts, FilterOptions } from "@/lib/supabase/helpers";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { World, Product } from "@/lib/supabase/types"; // Fixed Canonical Import
import Link from "next/link";

interface StorePageProps {
  searchParams: {
    world?: string;
    useCase?: string;
    fileType?: string;
    priceRange?: string;
    sort?: string;
  };
}

export default async function StorePage({ searchParams }: StorePageProps) {
  // Constraints: No popularity ranking (Anti-FOMO Rule)
  const filters: FilterOptions = {
    world: (searchParams.world as World) || 'All',
    useCase: searchParams.useCase,
    fileType: searchParams.fileType,
    priceRange: searchParams.priceRange as FilterOptions['priceRange'],
    sort: (searchParams.sort as FilterOptions['sort']) || 'newest',
  };

  const products = await getFilteredProducts(filters);

  return (
    <div className="pb-32 bg-canvas">
      <Breadcrumbs paths={[{ label: 'Universe Hub', href: '/store' }]} />
      
      {/* Strategic Header: Calm & Welcoming (Design System Section 4) */}
      <header className="px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="font-brand text-4xl font-medium tracking-tight text-kyn-slate-900 md:text-6xl">
            The Curated Hub
          </h1>
          <p className="mt-6 font-ui text-lg text-kyn-slate-500 leading-relaxed max-w-2xl">
            A collection of digital assets designed for clarity and order. 
            All items are one-time purchases with permanent lifetime ownership.
          </p>
        </div>
      </header>

      {/* Navigation Filter System (Sticky Handrail) */}
      <div className="sticky top-0 z-30 bg-canvas/80 backdrop-blur-xl border-b border-border transition-all duration-500">
        <FilterBar 
          currentWorld={filters.world || 'All'} 
        />
      </div>

      <section className="px-6 py-12">
        {products.length > 0 ? (
          <div className="space-y-20">
            {/* Grid: 1-col on mobile, 3-col on desktop (Design System 5.4) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as Product} />
              ))}
            </div>

            {/* Pagination / Contextual Footer */}
            {products.length >= 12 && (
              <div className="flex justify-center pt-8">
                <button className="rounded-xl border border-border bg-surface px-8 py-3 text-sm font-medium text-kyn-slate-600 hover:text-kyn-slate-900 transition-all duration-300">
                  Discover More
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State: Grounded & Reassured (UX Canon 1) */
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 h-16 w-16 rounded-full bg-surface flex items-center justify-center text-3xl grayscale opacity-60">
              🍃
            </div>
            <h3 className="font-brand text-xl font-medium text-kyn-slate-900">A quiet space</h3>
            <p className="mt-3 font-ui text-kyn-slate-400 max-w-xs mx-auto leading-relaxed">
              We couldn't find any tools matching your current selection. 
            </p>
            <Link 
              href="/store" 
              className="mt-8 font-ui text-sm font-medium text-kyn-green-700 underline underline-offset-4 hover:text-kyn-green-900"
            >
              Clear all filters
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
