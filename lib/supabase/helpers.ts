/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v2.0)
 * Logic: Production-ready data orchestration for Next.js 16.
 * Alignment: Canonical Supabase Type System (types.ts).
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  sort?: 'newest' | 'alphabetical';
}

/**
 * IDENTITY: Fetches the profile for the current user.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
  return data;
}

/**
 * OWNERSHIP: Validates if the current user owns a specific product.
 */
export async function checkOwnership(productId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data, error } = await supabase
    .from('user_library')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single();

  return !!data && !error;
}

/**
 * DISCOVERY: Optimized product retrieval aligned with Database schema.
 * Note: Price-based filtering is removed to align with the schema 
 * where pricing is handled via external Lemon Squeezy IDs.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // Filter by World (maps 'Home' to 'home' to match world_type enum)
  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world.toLowerCase());
  }

  // Sorting Logic: Uses available database columns
  if (options.sort === 'alphabetical') {
    query = query.order('title', { ascending: true });
  } else {
    // Default to newest items first
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Product fetch error:', error);
    return [];
  }
  
  return data || [];
}
