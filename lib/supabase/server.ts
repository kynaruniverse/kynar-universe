/**
 * KYNAR UNIVERSE: Server-Side Supabase Client (v1.5)
 * Role: Authentication and Data Fetching (Server Components/Actions/Routes)
 * High Criticality: Primary entry point for SSR data.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
// Fixed: Relative path for Netlify resolution
import { Database } from './types';

export async function createClient() {
  const cookieStore = await cookies();

  // Validate environment variables
  // On Netlify, ensure both prefixed and non-prefixed versions are in the dashboard
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Kynar System: Missing Supabase credentials. Check Netlify Environment Variables.'
    );
  }

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            /**
             * The `setAll` method was called from a Server Component.
             * This can be ignored IF middleware.ts is properly configured 
             * to refresh the session.
             */
          }
        },
      },
    }
  );
}
