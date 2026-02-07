import { supabaseServer } from './server';
import type { TablesInsert, Tables } from './types';
import { NextResponse } from 'next/server';

/**
 * Require an authenticated user.
 * Throws a 401 NextResponse if not authenticated.
 */
export async function requireAuth() {
  const { data: { user }, error } = await supabaseServer.auth.getUser();
  
  if (error || !user) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  
  return user;
}

/**
 * Log a webhook event to `webhook_events` table.
 * Accepts a fully typed TablesInsert<'webhook_events'> object.
 */
export async function logWebhookEvent(event: TablesInsert < 'webhook_events' > ) {
  const { error } = await supabaseServer
    .from('webhook_events')
    .insert(event);
  
  if (error) {
    console.error('[Webhook Log Error]', error);
    throw new Error('Failed to log webhook event');
  }
}

/**
 * Helper to fetch a single row from a table with optional relations.
 * Returns typed data or null, and throws if an error occurs.
 */
export async function fetchSingleRow <
  T extends keyof Tables < any > = any >
  (table: T, query: Record < string, any > , relations ? : string[]) {
    const select = relations?.length ? relations.map(r => `${r} (*)`).join(', ') : '*';
    const { data, error } = await supabaseServer
      .from(table as string)
      .select(select)
      .match(query)
      .maybeSingle() as unknown as { data: any;error: any };
    
    if (error) throw new Error(error.message || 'Supabase fetch error');
    
    return data;
  }

/**
 * Fetch a user's library entry with the related product.
 * Throws a 403 if the user doesn't own the product or it has no download_path.
 */
export async function getUserLibraryProduct(userId: string, productId: string) {
  const { data, error } = await supabaseServer
    .from('user_library')
    .select('product_id, products (*)')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle < { product_id: string;products: Tables < 'products' > | null } > ();
  
  if (error || !data?.products?.download_path) {
    throw new NextResponse('Forbidden', { status: 403 });
  }
  
  return data.products;
}