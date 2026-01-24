import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { env } from './env';

/**
 * Global Supabase Client (Browser Only)
 * * NOTE: This client uses localStorage to persist sessions.
 * It is suitable for Client Components (useAuth, event listeners).
 * It CANNOT be used in Server Components/Actions (they need cookies).
 */
export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true, // Handles OAuth/Magic Link redirects automatically
    },
  }
);
