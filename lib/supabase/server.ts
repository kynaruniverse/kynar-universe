/* KYNAR UNIVERSE: Server-Side Supabase Client (v1.4) */
import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

let supabaseServer: SupabaseClient < Database > | null = null;

/**
 * Singleton factory for a server-side Supabase client.
 * Uses SERVICE_ROLE_KEY only at runtime to avoid exposing secrets in build-time environments.
 */
export function getSupabaseServer(): SupabaseClient<Database> {
  if (!supabaseServer) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        `[Supabase Server] Missing environment variables. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.`
      );
    }

    supabaseServer = createSupabaseClient<Database>(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      }
    );
  }

  return supabaseServer;
}

/**
 * Optional alias for compatibility with components expecting createClient()
 */
export const createClient = (): SupabaseClient < Database > => getSupabaseServer();