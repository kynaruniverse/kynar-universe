"use client";
import { useState, useMemo } from 'react';
import { Product, World } from '@/types/index';

/**
 * useSearch Hook:
 * Manages the filtering logic for the Kynar Marketplace.
 * Aligns with UX Guide 2.2: World-specific grids and category sub-filters.
 */
export function useSearch(products: Product[]) {
  const [query, setQuery] = useState('');
  const [activeWorld, setActiveWorld] = useState<World | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query Match (Name or Hero Benefit)
      const matchesSearch = 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.hero_benefit.toLowerCase().includes(query.toLowerCase());

      // 2. World Filter Match (Home, Lifestyle, Tools)
      const matchesWorld = activeWorld === 'All' || product.world === activeWorld;

      // 3. Category Filter Match (Templates, Systems, Guides)
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;

      return matchesSearch && matchesWorld && matchesCategory;
    });
  }, [query, activeWorld, activeCategory, products]);

  return { 
    query, 
    setQuery, 
    activeWorld, 
    setActiveWorld, 
    activeCategory, 
    setActiveCategory, 
    filteredProducts 
  };
}
