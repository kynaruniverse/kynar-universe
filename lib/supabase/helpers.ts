/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v1.5)
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  priceRange?: 'free' | '1-5' | '5-15' | '15+';
  sort?: 'newest' | 'price-low' | 'price-high';
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
 * OWNERSHIP: Validates if the user owns a specific product.
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
 * DISCOVERY: Filtered product fetching.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from('products').select('*').eq('is_published', true);

  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Discovery error:', error);
    return [];
  }

  return data || [];
}
