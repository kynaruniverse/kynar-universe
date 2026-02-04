/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v1.6)
 * Fix: Applied object spreading to all returns to satisfy Next.js 16 RSC serialization.
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
  
  // Strip hidden prototypes for serialization
return data ? { ...(data as object) } : null;
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

  if (options.priceRange) {
    if (options.priceRange === 'free') query = query.eq('price', 0);
    if (options.priceRange === '1-5') query = query.gte('price', 1).lte('price', 5);
    if (options.priceRange === '5-15') query = query.gt('price', 5).lte('price', 15);
    if (options.priceRange === '15+') query = query.gt('price', 15);
  }

  if (options.sort === 'price-low') query = query.order('price', { ascending: true });
  else if (options.sort === 'price-high') query = query.order('price', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) {
    console.error('Fetch error:', error);
    return [];
  }

  // Next.js 16 FIX: Spread the array of objects to ensure each one is a plain object
  return (data || []).map(product => ({ ...product }));
}
