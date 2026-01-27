import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'

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
 * getAllProducts / getProducts
 * Unified to support both sitemap and store listing.
 */
export async function getAllProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*') // Selection broadened for store usage
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

// ALIAS: Resolves the 'getProducts' import error in page.tsx and sitemap.ts
export const getProducts = getAllProducts
