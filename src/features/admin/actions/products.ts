'use server';

import { ActionResult } from '@/lib/types/models/actions';
import { updateProduct } from '@/features/products/services/products.server';
import { revalidatePath } from 'next/cache';

export async function saveProduct(formData: any): Promise<ActionResult<string>> {
  // 1. Logic for updating or creating
  const { id, ...data } = formData;
  
  const { data: result, error } = id 
    ? await updateProduct(id, data)
    : { data: null, error: new Error("Create logic not implemented yet") };

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin');
  revalidatePath(`/product/${result.slug}`);
  
  return { success: true, data: result.id };
}
