/**
 * KYNAR UNIVERSE: Browser-Side Supabase Client (v1.5)
 * Role: Client-side interaction, Realtime subscriptions, Auth state.
 */

import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

// Singleton instance to prevent multiple connections
let clientInstance: ReturnType<typeof createBrowserClient<Database>> | undefined;

export const createClient = () => {
  // 1. Check for existing instance
  if (clientInstance) return clientInstance;

  // 2. Resolve variables within the function to ensure they are captured 
  // correctly during Next.js hydration.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Kynar Browser Client: Missing Environment Variables.');
  }

  // 3. Initialize Browser Client
  clientInstance = createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        flowType: 'pkce',
        persistSession: true,
        detectSessionInUrl: true,
        // Auto-refresh ensures the user isn't logged out while actively browsing
        autoRefreshToken: true,
      },
    }
  );

  return clientInstance;
};
