import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database, TablesInsert } from './types';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

/**
 * Singleton Supabase server client for all server-side routes
 */
export const supabaseServer = createSupabaseClient < Database > (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/**
 * Creates a Supabase client for server-side usage
 * Maintains compatibility with components expecting createClient
 */
export const createClient = () => {
  return supabaseServer;
};

/**
 * Require authentication for a request
 * Returns the user object if authenticated, otherwise null
 */
export async function requireAuth() {
  const { data, error } = await supabaseServer.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/**
 * Logs a webhook event into the database
 * Useful for webhooks that need to track processed/failed events
 */
export async function logWebhookEvent(event: TablesInsert < 'webhook_events' > ) {
  const { error } = await supabaseServer.from('webhook_events').insert(event);
  if (error) throw error;
  return true;
}

/**
 * Optional: any other shared server-side helpers can go here
 * Example: fetchUserLibrary, verifyPurchase, etc.
 */