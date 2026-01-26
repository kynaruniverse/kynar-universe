import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'

/**
 * getProductBySlug
 * Fetches a single product. 
 * Note: Uses the server client so Row Level Security (RLS) is respected.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null 
      
      console.error(`DB Error fetching slug [${slug}]:`, error.message)
      return null
    }

    return data
  } catch (err) {
    console.error('Critical failure in getProductBySlug:', err)
    return null
  }
}

/**
 * updateProduct
 * Uses supabaseAdmin to bypass RLS for administrative updates.
 */
export async function updateProduct(id: string, updates: Partial<Product>) {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  } catch (err: any) {
    return { data: null, error: { message: err.message } }
  }
}

/**
 * getAllProducts
 * Fetches all published products for the sitemap and store listing.
 */
export async function getAllProducts() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('slug, updated_at, world')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all products:', error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Critical failure in getAllProducts:', err)
    return []
  }
}
