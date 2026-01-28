"use client";
import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/index';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAdd?: (e: React.MouseEvent) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  // World-specific accent colors from Color Guide 2.0
  const worldAccents = {
    Home: "text-kyn-green-500 bg-kyn-green-50 border-kyn-green-100",
    Lifestyle: "text-kyn-caramel-500 bg-kyn-caramel-50 border-kyn-caramel-100",
    Tools: "text-kyn-slate-500 bg-kyn-slate-50 border-kyn-slate-100"
  };

  const accent = worldAccents[product.world] || worldAccents.Home;

  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="kyn-card p-5 h-full flex flex-col">
          
          {/* Visual Preview Area */}
          <div className="aspect-[4/3] w-full bg-kyn-canvas dark:bg-kyn-slate-800 rounded-3xl mb-6 overflow-hidden relative">
            {product.thumbnail_url ? (
              <img 
                src={product.thumbnail_url} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-kyn-slate-200 font-black text-4xl italic tracking-tighter uppercase opacity-20 select-none">
                {product.world}
              </div>
            )}
            
            {/* Floating Price Tag (Visual Guide 6.3) */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-kyn-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
               <span className="text-xs font-black text-kyn-slate-900 dark:text-white">
                 £{product.price_gbp}
               </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow space-y-3">
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${accent}`}>
                {product.world}
              </span>
              <ArrowUpRight size={14} className="text-kyn-slate-300 group-hover:text-kyn-slate-900 dark:group-hover:text-white transition-colors" />
            </div>

            <h3 className="text-lg font-black text-kyn-slate-900 dark:text-white leading-tight tracking-tight">
              {product.name}
            </h3>
            
            <p className="text-xs text-kyn-slate-500 dark:text-kyn-slate-400 font-medium italic line-clamp-2">
              {product.hero_benefit}
            </p>
          </div>

          {/* Instant Action (Mobile-First UX) */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              onAdd?.(e);
            }}
            className="mt-6 w-full py-4 bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          >
            <ShoppingBag size={14} />
            Add to Universe
          </button>
        </div>
      </Link>
    </div>
  );
};
