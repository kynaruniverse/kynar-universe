/**
 * KYNAR UNIVERSE: Server-Side Supabase Client
 * Role: Authentication and Data Fetching (Server Components/Actions)
 * High Criticality: Primary entry point for SSR data.
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './types';

export async function createClient() {
  const cookieStore = await cookies();

  // Validate environment variables for deployment stability
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
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
          } catch {
            /**
             * The `setAll` method was called from a Server Component.
             * This is safely ignored because session refreshing is 
             * managed by middleware.ts per Technical Canon.
             */
          }
        },
      },
    }
  );
}
