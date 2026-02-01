/**
 * KYNAR UNIVERSE: Supabase Data Helpers (v1.5)
 * Role: Abstraction layer for Identity, Discovery, and Ownership.
 */

import { createClient } from './server';
import { Product, World, Profile } from './types';
// Ensure this path is correct for your pricing logic
import { getPriceFromId } from '../marketplace/pricing';

export interface FilterOptions {
  world?: World | 'All';
  useCase?: string;
  fileType?: string;
  priceRange?: 'free' | '1-5' | '5-15' | '15+';
  sort?: 'newest' | 'price-low' | 'price-high';
}

/**
 * IDENTITY HELPER: Fetches the grounded profile for the current user.
 */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  
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
  return data as Profile;
}

/**
 * PRODUCT DISCOVERY: Fetches products with strict dimension filtering.
 * Optimized for Postgres JSONB and Array types.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  
  // Start with a clean query
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // 1. Strict Column Filtering
  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world);
  }

  // 2. Array Filtering: Postgres text[] syntax
  if (options.fileType) {
    query = query.contains('file_types', [options.fileType]);
  }

  // 3. JSONB Metadata Filtering: use_case lookup
  if (options.useCase) {
    // Correct syntax for searching within a JSONB column metadata
    query = query.contains('metadata', { use_case: options.useCase });
  }

  // Initial DB-side sort (by date)
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Discovery Error:', error);
    return [];
  }

  let products = (data as Product[]) || [];

  // 4. Memory Filtering for Prices (Since price depends on Lemon Squeezy logic)
  if (options.priceRange) {
    products = products.filter((p) => {
      const price = getPriceFromId(p.price_id);
      if (options.priceRange === 'free') return price === 0;
      if (options.priceRange === '1-5') return price > 0 && price <= 5;
      if (options.priceRange === '5-15') return price > 5 && price <= 15;
      if (options.priceRange === '15+') return price > 15;
      return true;
    });
  }

  // 5. Final Sort Alignment
  if (options.sort === 'price-low') {
    products.sort((a, b) => getPriceFromId(a.price_id) - getPriceFromId(b.price_id));
  } else if (options.sort === 'price-high') {
    products.sort((a, b) => getPriceFromId(b.price_id) - getPriceFromId(a.price_id));
  }

  return products;
}

/**
 * OWNERSHIP VALIDATION: The "Belonging Link"
 */
export async function checkOwnership(productId: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data, error } = await supabase
    .from('user_library')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') { // PGRST116 is just 'no rows found'
    console.error('Ownership check error:', error);
  }

  return !!data;
}
