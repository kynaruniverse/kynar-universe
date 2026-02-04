/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v2.1)
 * Logic: Production-ready data orchestration for Next.js 16.
 * Fix: Explicit type casting for Postgres Enum compatibility.
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  sort?: 'newest' | 'alphabetical';
}

/**
 * IDENTITY: Fetches the profile for the current user.
 * Note: 'await cookies()' is handled inside createClient() for Next.js 16.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle(); // Better than .single() to avoid 406 errors if profile is missing

  if (error) {
    console.error('[Helpers] Profile fetch error:', error);
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
    .maybeSingle();

  return !!data && !error;
}

/**
 * DISCOVERY: Optimized product retrieval aligned with Database schema.
 * Alignment: Maps UI 'World' strings to DB 'world_type' lowercase enums.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // 1. World Filtering with Type Casting
  // Matches Postgres Enum: 'home' | 'lifestyle' | 'tools'
  if (options.world && options.world !== 'All') {
    const dbWorld = options.world.toLowerCase();
    query = query.eq('world', dbWorld as string); 
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
  
  return (data as Product[]) || [];
}
