import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  sort?: 'newest' | 'alphabetical';
}

export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  return data;
}

export async function checkOwnership(productId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('user_library')
    .select('product_id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle();

  return !!data;
}

export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from('products').select('*').eq('is_published', true);

  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world.toLowerCase()); 
  }

  const { data } = await query.order('created_at', { ascending: false });
  return data || [];
}
