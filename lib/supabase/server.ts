import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
// Match your file tree: lib/supabase/types.ts
import { Database } from './types'; 

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
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Handled by Next.js 16/Middleware during SSR
          }
        },
      },
    }
  );
}
