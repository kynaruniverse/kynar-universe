import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let supabaseServer: SupabaseClient < Database > | null = null;

/**
 * Singleton factory for a server-side Supabase client.
 * Reads SERVICE_ROLE_KEY only at runtime to prevent leaks in build-time environments.
 */
export function getSupabaseServer(): SupabaseClient < Database > {
  if (!supabaseServer) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        'Missing Supabase environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
      );
    }
    
    supabaseServer = createSupabaseClient < Database > (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  
  return supabaseServer;
}

/**
 * Optional: factory for server-side routes expecting a createClient API
 */
export const createClient = (): SupabaseClient < Database > => getSupabaseServer();