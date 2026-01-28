import { useState, useMemo } from 'react';

export function useSearch(products: any[]) {
  const [query, setQuery] = useState('');
  const [activeWorld, setActiveWorld] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesWorld = activeWorld === 'All' || product.world === activeWorld;
      return matchesSearch && matchesWorld;
    });
  }, [query, activeWorld, products]);

  return { query, setQuery, activeWorld, setActiveWorld, filteredProducts };
}
