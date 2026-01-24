'use server';

import { createClient } from '@/utils/supabase/server';
import { requireAdmin } from '@/lib/auth/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateProductData } from '@/lib/validation';
import type { Database } from '@/lib/database.types';

type ProductInsert =
  Database['public']['Tables']['products']['Insert'];

type ProductUpdate =
  Database['public']['Tables']['products']['Update'];

export async function saveProduct(productData: {
  id ? : string;
  title: string;
  slug: string;
  world: 'Home' | 'Lifestyle' | 'Tools';
  category: string;
  price_id: string;
  content_url: string | null;
  short_description: string;
  description: string;
  preview_image: string | null;
  tags: string[];
  file_types: string[];
  is_published: boolean;
}) {
  await requireAdmin();
  
  const validation = validateProductData(productData);
  if (!validation.valid) {
    return { error: validation.errors?.join(', ') || 'Validation failed' };
  }
  
  const supabase = await createClient();
  const { id, ...dataToSave } = productData;
  
  let dbError;
  
  if (id) {
    const payload: ProductUpdate = {
      ...dataToSave,
      updated_at: new Date().toISOString(),
    };
    
    const { error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id);
    
    dbError = error;
  } else {
    const payload: ProductInsert = {
      ...dataToSave,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const { error } = await supabase
      .from('products')
      .insert(payload);
    
    dbError = error;
  }
  
  if (dbError) {
    return { error: dbError.message };
  }
  
  revalidatePath('/admin');
  revalidatePath('/store');
  revalidatePath('/');
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