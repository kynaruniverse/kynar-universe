'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/features/auth/lib/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateProductData } from '@/shared/utils/sanitization';
import { logAdminAction } from '@/shared/utils/audit';
import type { Database } from '@/lib/types/database';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ProductInsert =
  Database['public']['Tables']['products']['Insert'];

type ProductUpdate =
  Database['public']['Tables']['products']['Update'];
    
    /* -------------------------------------------------------------------------- */
    /*                                 Helpers                                    */
    /* -------------------------------------------------------------------------- */
    
    function removeUndefined < T extends object > (obj: T): Partial < T > {
      return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
      );
    }
    
    /* -------------------------------------------------------------------------- */
    /*                               Save / Update                                */
    /* -------------------------------------------------------------------------- */
    
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
      /* ---------------------------- AUTH / ADMIN ----------------------------- */
      
      const admin = await requireAdmin();
      
      /* ------------------------------ VALIDATION ----------------------------- */
      
      const validation = validateProductData(productData);
      
      if (!validation.valid) {
        return {
          error: validation.errors.join(', '),
        };
      }
      
      const supabase = await createClient();
      const { id, ...dataToSave } = validation.data;
      
      let dbError: any = null;
      
      /* -------------------------------- UPDATE ------------------------------- */
      
      if (id) {
        const payload: ProductUpdate = {
          ...dataToSave,
          updated_at: new Date().toISOString(),
        };
        
        const cleanPayload = removeUndefined(payload);
        
        if (Object.keys(cleanPayload).length === 0) {
          return { error: 'Nothing to update' };
        }
        
        const { error } = await supabase
          .from('products')
          .update(cleanPayload)
          .eq('id', id);
        
        dbError = error;
        
        if (!dbError) {
          await logAdminAction({
            admin_id: admin.id,
            action: 'UPDATE_PRODUCT',
            entity: 'product',
            entity_id: id,
            metadata: {
              title: dataToSave.title,
              world: dataToSave.world,
              is_published: dataToSave.is_published,
            },
          });
        }
        
        /* -------------------------------- INSERT ------------------------------- */
        
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
        
        if (!dbError) {
          await logAdminAction({
            admin_id: admin.id,
            action: 'CREATE_PRODUCT',
            entity: 'product',
            metadata: {
              title: dataToSave.title,
              world: dataToSave.world,
              is_published: dataToSave.is_published,
            },
          });
        }
      }
      
      /* -------------------------------- ERRORS ------------------------------- */
      
      if (dbError) {
        console.error('Product save error:', dbError.message);
        return { error: 'Failed to save product. Please try again.' };
      }
      
      /* ------------------------------ REVALIDATE ------------------------------ */
      
      revalidatePath('/admin');
      revalidatePath('/store');
      revalidatePath('/');
      redirect('/admin');
    }
    
    /* -------------------------------------------------------------------------- */
    /*                                  DELETE                                    */
    /* -------------------------------------------------------------------------- */
    
    export async function deleteProduct(id: string) {
      const admin = await requireAdmin();
      const supabase = await createClient();
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Product delete error:', error.message);
        return { error: 'Failed to delete product. Please try again.' };
      }
      
      await logAdminAction({
        admin_id: admin.id,
        action: 'DELETE_PRODUCT',
        entity: 'product',
        entity_id: id,
      });
      
      revalidatePath('/admin');
      revalidatePath('/store');
      revalidatePath('/');
      redirect('/admin');
    }