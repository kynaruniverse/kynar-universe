'use server';

import { createClient } from '@/utils/supabase/server';
import { requireAdmin } from '@/lib/auth/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateProductData } from '@/lib/validation';

export async function saveProduct(productData: {
  id?: string;
  title: string;
  slug: string;
  world: string;
  category: string;
  price_id: string;
  content_url: string;
  short_description: string;
  description: string;
  preview_image: string;
  tags: string[];
  file_types: string[];
  is_published: boolean;
}) {
  // 1. Verify admin
  await requireAdmin();
  
  // 2. Validate
  const validation = validateProductData(productData);
  if (!validation.valid) {
    return { error: validation.errors?.join(', ') || 'Validation failed' };
  }
  
  // 3. Database operation
  const supabase = await createClient();
  
  // Destructure to separate ID from the payload
  const { id, ...dataToSave } = productData;
  
  const payload = {
    ...dataToSave,
    updated_at: new Date().toISOString(),
  };
  
  let dbError;
  
  if (id) {
    // 'as any' is required here to bypass strict TS checks on mobile-pushed builds
    const { error } = await supabase
      .from('products')
      .update(payload as any)
      .eq('id', id);
    dbError = error;
  } else {
    const { error } = await supabase
      .from('products')
      .insert([{ 
        ...payload, 
        created_at: new Date().toISOString() 
      } as any]);
    dbError = error;
  }
  
  if (dbError) {
    return { error: dbError.message };
  }
  
  // 4. Revalidate and Redirect
  revalidatePath('/admin');
  revalidatePath('/store');
  revalidatePath('/');
  
  // Redirection in Next.js 15 must be the final call
  redirect('/admin');
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  
  const supabase = await createClient();
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    return { error: error.message };
  }
  
  revalidatePath('/admin');
  revalidatePath('/store');
  revalidatePath('/');
  
  redirect('/admin');
}
