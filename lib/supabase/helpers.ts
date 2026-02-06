/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v2.2)
 * Logic: Hardened for RLS and optimized for Phase 03 Realtime.
 * Enhancement: Removed redundant logic now handled by Database Policies.
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  sort?: 'newest' | 'alphabetical';
}

/**
 * IDENTITY: Fetches the profile for the current user.
 * Note: RLS ensures users can only see their own row in the 'profiles' table.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  
  // getUser() is still required here to get the specific ID for the query
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data, error } = await (supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle() as any); // Cast to any for Turbopack build stability

  if (error) {
    console.error('[Helpers] Profile fetch error:', error);
    return null;
  }
  return data as Profile;
}

/**
 * OWNERSHIP: Validates if the current user owns a specific product.
 * HARDENING: Now relies on RLS. If the user isn't logged in, RLS 
 * returns an empty result automatically.
 */
export async function checkOwnership(productId: string): Promise<boolean> {
  const supabase = await createClient();
  
  // We no longer manually filter by user.id if RLS is strictly set up, 
  // but keeping .eq('user_id', user.id) is a "belt and braces" approach.
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await (supabase
    .from('user_library')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle() as any);

  return !!data && !error;
}

/**
 * DISCOVERY: Optimized product retrieval.
 * Note: RLS handles the 'is_published' check if the policy is active,
 * but explicit filtering is kept for application-layer clarity.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // 1. World Filtering
  if (options.world && options.world !== 'All') {
    // Note: Ensure your DB enum matches lowercase strings (home, lifestyle, tools)
    const dbWorld = options.world.toLowerCase();
    query = query.eq('world', dbWorld); 
  }

  // 2. Sorting Logic
  if (options.sort === 'alphabetical') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await (query as any);

  if (error) {
    console.error('[Helpers] Product fetch error:', error.message);
    return [];
  }
  
  return (data as Product[]) || [];
}
