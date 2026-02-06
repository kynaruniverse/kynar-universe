/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v2.3)
 * Optimized for Next.js 15 SSR and strict Database Types.
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  sort?: 'newest' | 'alphabetical';
}

/**
 * IDENTITY: Fetches the profile for the current user.
 * Verified against 'profiles' table in schema.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('[Helpers] Profile fetch error:', error);
    return null;
  }
  return data;
}

/**
 * OWNERSHIP: Validates if the current user owns a specific product.
 * Checks against 'user_library' table.
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
    .maybeSingle();

  return !!data && !error;
}

/**
 * DISCOVERY: Optimized product retrieval.
 * Maps application World types to DB world_type enums.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // 1. World Filtering - Ensures alignment with DB Enum (home, lifestyle, tools)
  if (options.world && options.world !== 'All') {
    const dbWorld = options.world.toLowerCase();
    // Use 'as any' here only if the DB enum is strictly enforced as a different type
    query = query.eq('world', dbWorld); 
  }

  // 2. Sorting Logic
  if (options.sort === 'alphabetical') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Helpers] Product fetch error:', error.message);
    return [];
  }
  
  return data || [];
}
