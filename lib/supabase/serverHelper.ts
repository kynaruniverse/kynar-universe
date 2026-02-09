/* KYNAR UNIVERSE: Server Helpers (v1.5) */
import { getSupabaseServer } from './server';
import type { TablesInsert, Tables } from './types';
import { NextResponse } from 'next/server';

const supabaseServer = getSupabaseServer();

/**
 * Ensure an authenticated user exists.
 * Throws 401 Unauthorized if missing.
 */
export async function requireAuth() {
  const { data, error } = await supabaseServer.auth.getUser();
  
  if (error || !data.user) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  
  return data.user;
}

/**
 * Log a webhook event into the database.
 * Throws an error if insertion fails.
 */
export async function logWebhookEvent(event: TablesInsert < 'webhook_events' > ) {
  const { error } = await supabaseServer.from('webhook_events').insert(event);
  
  if (error) {
    console.error('[Webhook Log Error]', error);
    throw new Error('Failed to log webhook event');
  }
  
  return true;
}

/**
 * Fetch a single row from any table, optionally including relations.
 * Returns null if no row matches.
 */
export async function fetchSingleRow <
  T extends keyof Tables = string >
  (
    table: T,
    query: Record < string, any > ,
    relations ? : string[]
  ) {
    const select = relations?.length ? relations.map(r => `${r} (*)`).join(', ') : '*';
    
    const { data, error } = await supabaseServer
      .from(table as string)
      .select(select)
      .match(query)
      .maybeSingle() as { data: any;error: any };
    
    if (error) throw new Error(error.message || 'Supabase fetch error');
    return data;
  }

/**
 * Retrieve a user's library product with related product data.
 * Throws 403 if the user does not own the product or it has no download_path.
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