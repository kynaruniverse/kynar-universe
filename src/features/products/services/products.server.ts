import { adminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server'; // Using our fixed server client
import type { Database } from '@/lib/types/database';

type ProductRow = Database['public']['Tables']['products']['Row'];

/**
 * getProductBySlug
 * Fetches a single product. 
 * Note: We use the standard client so Row Level Security (RLS) is respected.
 */
export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      // If no rows found, this isn't a crash, just a 404
      if (error.code === 'PGRST116') return null; 
      
      console.error(`DB Error fetching slug [${slug}]:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Critical failure in getProductBySlug:', err);
    return null;
  }
}

/**
 * updateProduct
 * Uses adminClient to bypass RLS for administrative updates.
 */
export async function updateProduct(id: string, updates: Partial<ProductRow>) {
  try {
    const { data, error } = await adminClient
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  } catch (err: any) {
    return { data: null, error: { message: err.message } };
  }
}

/**
 * getAllProducts
 * Fetches all published products for the sitemap and store listing.
 */
export async function getAllProducts() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('slug, updated_at, world')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all products:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Critical failure in getAllProducts:', err);
    return [];
  }
}
