import { createBrowserClient } from '@supabase/ssr';
// Fixed path: removing the redundant 'models/models'
import { Database } from '@/lib/types/database'; 

/**
 * Standard Supabase Browser Client
 * Used for client-side authentication and data fetching
 */
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Keeping this alias to satisfy any existing 'browserClient' references
export const browserClient = supabase;
