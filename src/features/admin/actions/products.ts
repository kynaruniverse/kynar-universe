'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { updateProduct } from '@/features/products/services/products.server'
import { requireAdmin } from '@/features/auth/lib/server'
import type { ActionResult } from '@/shared/types' // Standardized path

/**
 * saveProduct
 * High-privilege action to create or update marketplace assets.
 * Uses the Admin Client to bypass RLS for management tasks.
 */
export async function saveProduct(formData: any): Promise<ActionResult<string>> {
  try {
    // 1. Security Gate: Ensure the requester has 'admin' metadata
    await requireAdmin()

    const { id, ...data } = formData
    let result
    let error

    if (id) {
      // UPDATE existing product
      const updateResult = await updateProduct(id, data)
      result = updateResult.data
      error = updateResult.error
    } else {
      // CREATE new product
      const createResult = await supabaseAdmin
        .from('products')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()
      
      result = createResult.data
      error = createResult.error
    }

    if (error) {
      console.error('Forge Sync Error:', error.message)
      return { success: false, error: 'Database synchronization failed.' }
    }

    // 2. Next.js 15 Cache Invalidation
    // We target the admin dashboard, the store feed, and the specific artifact page
    revalidatePath('/admin')
    revalidatePath('/store')
    if (result?.slug) {
      revalidatePath(`/product/${result.slug}`)
    }
    
    return { success: true, data: result?.id }
  } catch (err: any) {
    console.error('Critical Admin Action Failure:', err)
    return { success: false, error: 'Authorization or System failure.' }
  }
}
