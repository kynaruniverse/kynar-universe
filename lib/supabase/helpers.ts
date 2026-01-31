import { createClient } from './server';
import { Product, World, Profile, UserLibrary } from './types';
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
 * Aligned with UX Canon Section 5 (Identity).
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

  if (error) return null;
  return data as Profile;
}

/**
 * PRODUCT DISCOVERY: Fetches products with strict dimension filtering.
 */
export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world);
  }

  if (options.useCase) {
    query = query.contains('metadata', { use_case: options.useCase });
  }

  if (options.fileType) {
    query = query.contains('file_types', [options.fileType]);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  let products = (data as Product[]) || [];

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

  if (options.sort === 'price-low') {
    products.sort((a, b) => getPriceFromId(a.price_id) - getPriceFromId(b.price_id));
  } else if (options.sort === 'price-high') {
    products.sort((a, b) => getPriceFromId(b.price_id) - getPriceFromId(a.price_id));
  }

  return products;
}

/**
 * OWNERSHIP VALIDATION: Checks the Library for existence.
 * Aligned with UX Canon Section 7 (The Belonging Link).
 * Replaces old 'purchases' check with the streamlined UUID library check.
 */
export async function checkOwnership(productId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  // We check user_library directly. If a row exists, they own it.
  const { data, error } = await supabase
    .from('user_library')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle();

  return !!data;
}
