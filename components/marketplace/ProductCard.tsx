/**
 * KYNAR UNIVERSE: Product Card (v1.6)
 * Role: Primary Discovery & Acquisition unit.
 * Philosophy: Dual-action - Explore (Link) vs. Select (Button).
 * Optimization: Mobile-first responsive grid-safe layout; Next.js 15 Ready.
 */

import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { formatGBP } from "@/lib/utils";
import { getPriceFromId } from "@/lib/marketplace/pricing";
import { Database } from "@/lib/supabase/types";

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Determine display price using the hardened Pricing Engine
  const priceValue = getPriceFromId(product.price_id);

  return (
    <article className="group relative flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
      
      {/* 1. Visual Stage: Narrative Exploration 
          The 'aspect-[4/5]' ensures a consistent editorial feel across all screen sizes.
      */}
      <Link 
        href={`/products/${product.slug}`} 
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface border border-kyn-slate-50 transition-all duration-500 hover:shadow-kynar-soft"
        aria-label={`View details for ${product.title}`}
      >
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.title} 
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 ease-kyn-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-kyn-slate-50 text-kyn-slate-200">
            <Compass size={48} strokeWidth={1} />
          </div>
        )}

        {/* Discovery Overlay: Subtle atmospheric gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-kyn-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Floating Indicator: Signals depth to the user */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-kyn-slate-900 shadow-sm opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight size={20} />
        </div>

        {/* Grounded Price Badge */}
        <div className="absolute left-4 bottom-4 rounded-xl bg-kyn-slate-900/80 backdrop-blur-md px-3 py-1.5 font-brand text-[11px] font-bold text-white tracking-tight">
          {priceValue === 0 ? "Complimentary" : formatGBP(priceValue)}
        </div>
      </Link>

      {/* 2. Content & Acquisition Zone 
          Decoupled from the main Link to prevent accidental navigation.
      */}
      <div className="mt-5 space-y-4 px-1">
        <div className="flex flex-col">
          <span className="font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-kyn-slate-400">
            {product.world || "Universal"} World
          </span>
          <h3 className="mt-1 font-brand text-lg font-bold text-kyn-slate-900 line-clamp-1">
            {product.title}
          </h3>
        </div>

        {/* Transactional Trigger 
            Integrated with Cart Store, Haptics, and Micro-Celebrations.
        */}
        <div className="relative">
          <AddToCartButton 
            product={product} 
            variant="ghost" 
            className="w-full !py-3.5 text-xs tracking-wider" 
          />
        </div>
      </div>
    </article>
  );
};
