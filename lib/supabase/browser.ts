import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export const createClient = () => {
  if (client) return client;

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        persistSession: true,
        detectSessionInUrl: true,
      },
    }
  );

  return client;
};
