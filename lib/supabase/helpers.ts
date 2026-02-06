/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v2.4)
 * Evolution: Build-Safe Type Handling & Error Suppression
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  sort?: 'newest' | 'alphabetical';
}

/**
 * IDENTITY: Fetches the profile for the current user.
 * Explicitly typed to satisfy strict Row/Profile alignment.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  
  // Destructure with explicit null-check to avoid auth context errors
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('[Helpers] Profile fetch error:', error.message);
    return null;
  }

  return data as Profile | null;
}

/**
 * OWNERSHIP: Validates if the current user owns a specific product.
 * Returns boolean for UI logic.
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
 * Logic: Maps 'All' world selection to a broad query.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // Apply World Filter: Convert 'Lifestyle' -> 'lifestyle' for DB Enum match
  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world.toLowerCase()); 
  }

  // Apply Sorting
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

  return (data as Product[]) || [];
}
