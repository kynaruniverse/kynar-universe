import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

/**
 * KYNAR UNIVERSE: Client-side Supabase Initializer
 */

// We use 'any' for the initial declaration and let the function 
// define the type strictly to bypass parser bugs in mobile editors.
let client: any;

export const createClient = () => {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase Browser Client: Missing environment variables.');
  }
  
  // The type safety is enforced right here at the source
  client = createBrowserClient<Database>(
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

  return client;
};
