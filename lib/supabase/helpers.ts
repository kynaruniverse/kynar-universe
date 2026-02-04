import { createClient } from './server';
import { Product, World, Profile } from './types';

export interface FilterOptions {
  world?: World | 'All';
  priceRange?: 'free' | '1-5' | '5-15' | '15+';
  sort?: 'newest' | 'price-low' | 'price-high';
}

export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error || !data) {
    if (error) console.error('Profile fetch error:', error);
    return null;
  }
  
  return {
    id: data.id,
    email: data.email,
    full_name: data.full_name,
    is_admin: data.is_admin,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
}

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

export async function getFilteredProducts(options: FilterOptions): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase.from('products').select('*').eq('is_published', true);

  if (options.world && options.world !== 'All') {
    query = query.eq('world', options.world);
  }

  if (options.priceRange) {
    if (options.priceRange === 'free') query = query.eq('price_id', 'free');
    if (options.priceRange === '1-5') query = query.gte('metadata->price', 1).lte('metadata->price', 5);
    if (options.priceRange === '5-15') query = query.gt('metadata->price', 5).lte('metadata->price', 15);
    if (options.priceRange === '15+') query = query.gt('metadata->price', 15);
  }

  if (options.sort === 'price-low') query = query.order('price_id', { ascending: true });
  else if (options.sort === 'price-high') query = query.order('price_id', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error || !data) {
    if (error) console.error('Fetch error:', error);
    return [];
  }

  return data.map((p): Product => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    short_description: p.short_description,
    price_id: p.price_id,
    variant_id: p.variant_id,
    lemon_squeezy_id: p.lemon_squeezy_id,
    preview_image: p.preview_image,
    download_path: p.download_path,
    file_types: p.file_types,
    tags: p.tags,
    category: p.category,
    world: p.world,
    is_published: p.is_published,
    metadata: p.metadata,
    created_at: p.created_at,
    updated_at: p.updated_at
  }));
}
