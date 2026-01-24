import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';
import { WORLDS } from '@/lib/constants';
import type { Product } from '@/lib/types';

/**
 * Fetch a list of products with optional filtering and search.
 * Server-only (cookies-based Supabase client).
 */
export const getProducts = cache(
  async (filter ? : {
    world ? : string;
    limit ? : number;
    publishedOnly ? : boolean;
    search ? : string;
  }) => {
    const supabase = await createClient();
    
    let query = supabase
      .from('products')
      .select(
        'id, title, slug, world, price_id, short_description, preview_image, tags'
      )
      .order('created_at', { ascending: false });
    
    // 1. Default: published products only
    if (filter?.publishedOnly !== false) {
      query = query.eq('is_published', true);
    }
    
    // 2. World filtering (normalized + validated)
    if (filter?.world) {
      const normalized = filter.world.toLowerCase();
      const matchingWorld = WORLDS.find(
        (w) => w.toLowerCase() === normalized
      );
      
      if (!matchingWorld) {
        return [];
      }
      
      query = query.eq('world', matchingWorld);
    }
    
    // 3. Search (title + short description)
    if (filter?.search) {
      const term = `%${filter.search}%`;
      query = query.or(
        `title.ilike.${term},short_description.ilike.${term}`
      );
    }
    
    // 4. Limit
    if (filter?.limit) {
      query = query.limit(filter.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('[ProductService:getProducts]', error.message);
      return [];
    }
    
    return (data ?? []) as Product[];
  }
);

/**
 * Fetch a single product by slug.
 * Returns null if not found.
 */
export const getProductBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    // Ignore "row not found"
    if (error.code !== 'PGRST116') {
      console.error(
        `[ProductService:getProductBySlug:${slug}]`,
        error.message
      );
    }
    return null;
  }
  
  return data as Product;
});