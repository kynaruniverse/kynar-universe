"use client";

import React from 'react';
import ProductCard from '../../components/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Workflow Pro Template',
    price: 24.99,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=800&auto=format&fit=crop',
    description: 'A comprehensive Notion workspace designed for modern professionals and creative teams.'
  },
  {
    id: '2',
    name: 'Minimalist UI Kit',
    price: 49.00,
    category: 'Life',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop',
    description: 'Clean, accessible, and high-performance UI components for React and Figma.'
  },
  {
    id: '3',
    name: 'Digital Garden Planner',
    price: 15.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1544411047-c491584222f0?q=80&w=800&auto=format&fit=crop',
    description: 'A structured system for organizing your learning, research, and long-term goals.'
  }
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-brand-base pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-brand-text mb-4">Marketplace</h1>
          <p className="text-color-muted max-w-2xl">
            Explore our curated selection of premium digital assets, tools, and resources.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
