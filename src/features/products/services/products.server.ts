import { adminClient } from '@/lib/supabase/admin';
import { serverClient } from '@/lib/supabase/server';
import { handleAsync } from '@/shared/utils/async';
import type { Database } from '@/lib/types/database';

type ProductRow = Database['public']['Tables']['products']['Row'];

export async function getProductBySlug(slug: string) {
  const supabase = await serverClient();
  const [data, error] = await handleAsync(
    supabase.from('products').select('*').eq('slug', slug).single()
  );
  return { data, error };
}

export async function updateProduct(id: string, updates: Partial<ProductRow>) {
  const [data, error] = await handleAsync(
    adminClient.from('products').update(updates).eq('id', id).select().single()
  );
  return { data, error };
}
