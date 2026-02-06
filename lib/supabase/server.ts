import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './types'; 

/**
 * KYNAR UNIVERSE: Server-side Supabase Initializer
 * Optimized for Next.js 15 Async Headers & SSR
 */
export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            // This loop allows Supabase to refresh tokens automatically
            // during Server Actions or Route Handlers.
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // This catch is intentional. 
            // Next.js throws an error if you try to set cookies in a Server Component.
            // The Middleware handles the actual cookie refresh in those cases.
          }
        },
      },
    }
  );
}
