/**
 * KYNAR UNIVERSE: Product Card (v1.5)
 * Aligned with: Design System Section 6 (Cards) & UX Canon Section 5
 * Role: Primary discovery vehicle for the Store and World pages.
 */

import Link from "next/link";
import { Product } from "@/lib/supabase/types"; // Fixed Coupling
import { getPriceFromId, formatGBP } from "@/lib/marketplace/pricing";
import { ArrowUpRight, Box } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const price = getPriceFromId(product.price_id);
  const displayPrice = formatGBP(price);

  // Design System Section 3: Semantic World Mapping
  const worldStyles: Record<string, { text: string; bg: string; border: string }> = {
    Home: { text: 'text-kyn-green-700', bg: 'bg-green-50/80', border: 'border-green-100' },
    Lifestyle: { text: 'text-kyn-caramel-700', bg: 'bg-orange-50/80', border: 'border-orange-100' },
    Tools: { text: 'text-kyn-slate-600', bg: 'bg-slate-50/80', border: 'border-slate-200' },
  };

  const currentStyle = worldStyles[product.world] || worldStyles.Tools;

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-canvas p-4 transition-all duration-500 ease-out hover:border-kyn-slate-300 hover:shadow-sm"
    >
      {/* Preview Area - Grounded Visual Vessel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface">
        {/* Subtle Surface Shift on Hover */}
        <div className="absolute inset-0 bg-kyn-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* World Identifier - Section 12 (Worlds System) */}
        <div className="absolute left-3 top-3 z-10">
          <span className={`rounded px-2 py-1 font-ui text-[10px] font-medium uppercase tracking-[0.1em] backdrop-blur-sm border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}>
            {product.world}
          </span>
        </div>

        {/* Action Signal: Only visible on hover/focus */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="rounded-full bg-white/90 p-2 shadow-sm">
            <ArrowUpRight size={16} className="text-kyn-slate-900" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-brand text-base font-bold text-kyn-slate-900 leading-tight group-hover:text-black">
            {product.title}
          </h3>
          <span className="font-brand text-sm font-medium text-kyn-slate-900 whitespace-nowrap">
            {displayPrice}
          </span>
        </div>

        <p className="font-ui mt-2 line-clamp-2 text-sm text-text-secondary leading-relaxed opacity-80">
          {product.short_description}
        </p>

        {/* Footer: Ownership and Format Metadata */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {product.file_types?.slice(0, 2).map((type) => (
              <span 
                key={type} 
                className="font-ui text-[9px] font-medium text-kyn-slate-400 uppercase tracking-wider bg-surface/50 px-1.5 py-0.5 rounded border border-border/50"
              >
                {type}
              </span>
            ))}
          </div>
          
          {/* Ownership Signal (Business Ref 23: Permanence) */}
          <div className="flex items-center gap-1 font-ui text-[9px] font-medium text-kyn-green-700 uppercase tracking-widest">
            <Box size={10} />
            <span>Own Forever</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
