'use server';

import { revalidatePath } from 'next/cache';
import { adminClient } from '@/lib/supabase/admin';
import { updateProduct } from '@/features/products/services/products.server';

// FIX: Simplified the response type to avoid the broken ActionResult import
export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * saveProduct
 * Handles both creating new assets and updating existing ones.
 */
export async function saveProduct(formData: any): Promise<ActionResponse<string>> {
  try {
    const { id, ...data } = formData;

    let result;
    let error;

    if (id) {
      // UPDATE existing product
      const updateResult = await updateProduct(id, data);
      result = updateResult.data;
      error = updateResult.error;
    } else {
      // CREATE new product
      const createResult = await adminClient
        .from('products')
        .insert([data])
        .select()
        .single();
      
      result = createResult.data;
      error = createResult.error;
    }

    if (error) {
      console.error('Admin Product Save Error:', error.message);
      return { success: false, error: error.message };
    }

    // Refresh the cache so changes show up immediately
    revalidatePath('/admin');
    revalidatePath('/store');
    if (result?.slug) {
      revalidatePath(`/product/${result.slug}`);
    }
    
    return { success: true, data: result?.id };
  } catch (err: any) {
    console.error('Action failure:', err);
    return { success: false, error: 'A critical error occurred while saving.' };
  }
}
