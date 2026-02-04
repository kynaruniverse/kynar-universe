import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase Browser Client: Missing environment variables.');
    }
    
    const client = createBrowserClient < Database > (
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
    
    // Return a properly typed client by explicitly typing the from method
    return {
      ...client,
      from: <T extends keyof Database['public']['Tables']>(table: T) => {
      return client.from(table);
    }
  } as ReturnType<typeof createBrowserClient<Database>>;
};