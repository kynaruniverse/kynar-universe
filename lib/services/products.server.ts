import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';
import { WORLDS } from '@/lib/constants';
import type { Product } from '@/lib/types';

/**
 * Fetch a list of products with optional filtering and search.
 */
export const getProducts = cache(async (filter ? : {
  world ? : string;
  limit ? : number;
  publishedOnly ? : boolean;
  search ? : string;
}) => {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  // 1. Default to published only
  if (filter?.publishedOnly !== false) {
    query = query.eq('is_published', true);
  }
  
  // 2. Handle 'World' filtering
  if (filter?.world) {
    const normalizedInput = filter.world.toLowerCase();
    const matchingWorld = WORLDS.find(w => w.toLowerCase() === normalizedInput);
    
    if (matchingWorld) {
      query = query.eq('world', matchingWorld);
    } else {
      return [];
    }
  }
  
  // 3. Handle Search Query
  if (filter?.search) {
    const term = `%${filter.search}%`;
    // Searches title, description, or tags for the term
    query = query.or(`title.ilike.${term},short_description.ilike.${term},tags.cs.{${filter.search}}`);
  }
  
  if (filter?.limit) {
    query = query.limit(filter.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`[ProductService] List Error: ${error.message}`);
    return [];
  }
  
  // Runtime validation
  const validProducts = data?.filter(product => {
    if (!WORLDS.includes(product.world as any)) {
      console.error(`[ProductService] Invalid world value: ${product.world} for product ${product.id}`);
      return false;
    }
    return true;
  });
  
  return (validProducts as Product[]) || [];
});

/**
 * Fetch a single product by its unique slug.
 */
export const getProductBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`[ProductService] Slug Error (${slug}):`, error.message);
    }
    return null;
  }
  
  return data as Product;
});