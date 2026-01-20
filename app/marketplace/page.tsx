"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { getCategoryTheme } from '../../lib/theme';
import { AnimatePresence } from 'framer-motion';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Workflow Pro Template', price: 24.99, category: 'Tools', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop', description: 'Comprehensive Notion workspace.' },
  { id: '2', name: 'Minimalist UI Kit', price: 49.00, category: 'Life', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop', description: 'Clean React components.' },
  { id: '3', name: 'Digital Garden Planner', price: 15.00, category: 'Home', image: 'https://images.unsplash.com/photo-1544411047-c491584222f0?q=80&w=800&auto=format&fit=crop', description: 'Structured learning system.' },
  { id: '4', name: 'Deep Work Timer', price: 12.00, category: 'Tools', image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop', description: 'Focus enhancement tool.' },
  { id: '5', name: 'Creative Palette', price: 19.00, category: 'Life', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop', description: 'Color theory for designers.' },
];

// 1. INNER COMPONENT: Contains the SearchParams logic and State
function MarketplaceContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const theme = getCategoryTheme(category || undefined);
  
  const [displayCount, setDisplayCount] = useState(6);
  const filteredProducts = category 
    ? MOCK_PRODUCTS.filter(p => p.category === category)
    : MOCK_PRODUCTS;

  return (
    <main className="min-h-screen bg-brand-base pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-20 space-y-6">
          <div className="flex items-center gap-4">
            <span className={`text-xs font-bold uppercase tracking-[0.3em] ${theme.text}`}>
              {category ? theme.sublabel : "Storehouse"}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-brand-text tracking-tight">
            {category ? `${category} Room` : "Our Collections"}
          </h1>
          <p className="text-xl text-color-muted max-w-2xl font-light leading-relaxed">
            {category 
              ? `A focused selection of ${category.toLowerCase()} resources, chosen for their quality and lasting value.`
              : "Every item in our marketplace has been hand-selected. No noise, just essentials."}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.slice(0, displayCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </section>

        {filteredProducts.length > displayCount && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="px-12 py-5 border border-color-border rounded-btn text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-text hover:text-white transition-all duration-base"
            >
              Reveal More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// 2. EXPORTED PAGE: Wraps the logic in Suspense to satisfy Next.js Build
export default function MarketplacePage() {
  return (
    // Fallback avoids layout shift while reading URL params
    <Suspense fallback={<div className="min-h-screen bg-brand-base pt-32 px-6" />}>
      <MarketplaceContent />
    </Suspense>
  );
}
