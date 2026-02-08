import { NextResponse } from 'next/server';
import { getSupabaseServer } from './server';
import type { TablesInsert, Tables } from './types';

/**
 * Require an authenticated user
 */
export async function requireAuth() {
  const supabase = getSupabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  return user;
}

/**
 * Log a webhook event to 'webhook_events'
 */
export async function logWebhookEvent(event: TablesInsert<'webhook_events'>) {
  const supabase = getSupabaseServer();
  const { error } = await supabase.from('webhook_events').insert(event);
  if (error) {
    console.error('[Webhook Log Error]', error);
    throw new Error('Failed to log webhook event');
  }
}

/**
 * Fetch a single row from a table with optional relations
 */
export async function fetchSingleRow<T extends string = string>(
  table: T,
  query: Record<string, any>,
  relations?: string[]
) {
  const supabase = getSupabaseServer();
  const select = relations?.length ? relations.map(r => `${r} (*)`).join(', ') : '*';

  const { data, error } = await supabase
    .from(table as any)
    .select(select)
    .match(query)
    .maybeSingle() as unknown as { data: any; error: any };

  if (error) throw new Error(error.message || 'Supabase fetch error');

  return data;
}

/**
 * Fetch a user's library product
 * Throws 403 if not owned or missing download_path
 */
export async function getUserLibraryProduct(userId: string, productId: string) {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('user_library')
    .select('product_id, products (*)')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle<{ product_id: string; products: Tables<'products'> | null }>();

  if (error || !data?.products?.download_path) {
    throw new NextResponse('Forbidden', { status: 403 });
  }

  return data.products;
}
