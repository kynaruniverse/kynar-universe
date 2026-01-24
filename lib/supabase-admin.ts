import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

/**
 * Supabase Admin Client
 *
 * - Uses SERVICE ROLE key (bypasses RLS)
 * - Server-only (API routes, webhooks, background jobs)
 * - Singleton to avoid repeated instantiation
 * - No auth/session persistence
 */

let adminClient: SupabaseClient < Database > | null = null;

export function getAdminClient(): SupabaseClient < Database > {
  if (adminClient) return adminClient;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }
  
  if (!serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }
  
  adminClient = createClient < Database > (url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
  
  return adminClient;
}