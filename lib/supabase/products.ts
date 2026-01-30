import { createClient } from '@/lib/supabase/client'; // Assuming your client setup

export async function getProducts() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_assets (*)
    `)
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}
