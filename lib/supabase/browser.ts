/**
 * KYNAR UNIVERSE: Browser-Side Supabase Client (v1.6)
 * Role: Client-side interaction with Next.js 16 SSR compatibility.
 */

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

export const createClient = () => {
  // We fetch these inside the function to ensure they are read at the moment of execution
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Defensive check: If these are missing, we throw a clear error that shows up in Netlify logs
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase Browser Client: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is undefined.');
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        flowType: 'pkce',
        persistSession: true,
        detectSessionInUrl: true,
        autoRefreshToken: true,
      },
    }
  );
};
