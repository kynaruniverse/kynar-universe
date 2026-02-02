/**
 * KYNAR UNIVERSE: Browser-Side Supabase Client (v1.5)
 * Role: Client-side interaction, Realtime subscriptions, Auth state.
 */

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | undefined;

export const createClient = () => {
  if (clientInstance) return clientInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase Browser Client: Environment variables are missing.');
  }

  clientInstance = createBrowserClient<Database>(
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

  return clientInstance;
};
