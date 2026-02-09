/**
 * KYNAR UNIVERSE: Product Card (v1.7)
 * Role: Primary Discovery & Acquisition unit.
 * Philosophy: Explore (Link) vs. Select (Action).
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Compass } from "lucide-react";

import { AddToCartButton } from "./AddToCartButton";
import { formatGBP } from "@/lib/utils";
import { getPriceFromId } from "@/lib/marketplace/pricing";
import { Product } from "@/lib/supabase/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const price = getPriceFromId(product.price_id);
  const displayPrice = price === 0 ? "Complimentary" : formatGBP(price);
  
  return (
    <article className="group relative flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
      {/* ───────────────────────── Visual Stage ───────────────────────── */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View details for ${product.title}`}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-kyn-slate-50 bg-surface transition-all duration-500 hover:shadow-kynar-soft"
      >
        {product.preview_image ? (
          <Image
            src={product.preview_image}
            alt={product.title}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-kyn-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-kyn-slate-50 text-kyn-slate-200">
            <Compass size={48} strokeWidth={1} />
          </div>
        )}

        {/* Atmospheric Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-kyn-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Depth Indicator */}
        <div className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-white/90 text-kyn-slate-900 backdrop-blur-md shadow-sm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 rounded-xl bg-kyn-slate-900/80 px-3 py-1.5 font-brand text-[11px] font-bold tracking-tight text-white backdrop-blur-md">
          {displayPrice}
        </div>
      </Link>

      {/* ───────────────────── Content & Action Zone ───────────────────── */}
      <div className="mt-5 space-y-4 px-1">
        <header>
          <span className="font-ui text-[10px] font-bold uppercase tracking-[0.25em] text-kyn-slate-400">
            {(product.world ?? "Universal") + " World"}
          </span>
          <h3 className="mt-1 line-clamp-1 font-brand text-lg font-bold text-kyn-slate-900">
            {product.title}
          </h3>
        </header>

        <AddToCartButton
          product={product}
          className="w-full !py-3.5 text-xs tracking-wider"
        />
      </div>
    </article>
  );
};