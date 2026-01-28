import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Fail-safe: Ensure we don't initialize with empty strings during build/edge cases.
 * In Next.js 15, environment variables are not always available during static generation.
 */
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("Kynar Alert: Supabase environment variables are missing from .env.local");
  }
}

/**
 * Standard Supabase Client (Client-Side Safe)
 * used for Auth and fetching public World data.
 */
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
