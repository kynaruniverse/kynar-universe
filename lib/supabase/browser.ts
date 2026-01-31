/**
 * KYNAR UNIVERSE: Browser-Side Supabase Client
 * Role: Client-side interaction, Realtime subscriptions, Auth state
 * Criticality: HIGH (Direct impact on User Experience/Presence)
 */

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | undefined;

export const createClient = () => {
  // Return existing instance to maintain a single connection (Singleton Pattern)
  if (clientInstance) return clientInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Kynar Universe Configuration Error: Missing browser environment variables.'
    );
  }

  clientInstance = createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      // Optional: Add configuration for calm UX (e.g., custom storage if needed)
      auth: {
        flowType: 'pkce',
        persistSession: true,
        detectSessionInUrl: true,
      },
    }
  );

  return clientInstance;
};
