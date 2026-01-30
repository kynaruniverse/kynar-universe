'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { filterProducts } from '@/lib/utils/filters';
import { formatPrice } from '@/lib/utils/format';
import Chip from '@/components/ui/Chip';
import Card from '@/components/ui/Card';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link';

export default function StorePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  // Uses the centralized filter logic from lib/utils/filters.ts
  const filteredProducts = filterProducts(products, { world: activeFilter });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      
      {/* 1. Header & Orientation */}
      <section>
        <h1 className="text-2xl font-semibold text-kyn-green-700">Marketplace</h1>
        <p className="text-sm text-kyn-slate-500 mt-1">Curated tools for your digital universe.</p>
      </section>

      {/* 2. Unified Filter Bar */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
        {['all', 'home', 'lifestyle', 'tools'].map((w) => (
          <Chip
            key={w}
            label={w}
            active={activeFilter === w}
            onClick={() => setActiveFilter(w)}
            world={w !== 'all' ? w as any : undefined}
          />
        ))}
      </div>

      {/* 3. Loading & Result States */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 w-full bg-kyn-slate-500/5 rounded-[32px] animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card className="group flex flex-col p-6 h-full">
                {/* Product Meta */}
                <div className="flex justify-between items-start mb-4">
                  <Chip label={product.world} world={product.world} />
                  <span className="text-sm font-bold text-kyn-green-700">
                    {formatPrice(product.price_gbp)}
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-kyn-green-700 mb-1 group-hover:text-kyn-green-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs font-bold text-kyn-slate-400 uppercase tracking-widest mb-3">
                    {product.format_label}
                  </p>
                  <p className="text-sm text-kyn-slate-500 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Action Indicator */}
                <div className="mt-6 pt-4 border-t border-kyn-slate-500/5 flex justify-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-kyn-slate-400 group-hover:text-kyn-green-700 transition-colors">
                    View Asset →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </ProductGrid>
      ) : (
        <div className="py-20 text-center">
          <p className="text-sm text-kyn-slate-400 italic">No tools found in this world yet.</p>
        </div>
      )}

      {/* 4. The End of Shelf */}
      <footer className="py-12 flex flex-col items-center justify-center text-center">
        <div className="w-1 h-1 rounded-full bg-kyn-slate-500/20 mb-4" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-kyn-slate-500/40 font-bold">
          The Universe is expanding. <br /> Check back for new tools soon.
        </p>
      </footer>

    </div>
  );
}
