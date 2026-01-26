import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/database';

/**
 * Supabase Admin Client
 * WARNING: This bypasses Row Level Security (RLS). 
 * Use ONLY in Server Actions or API Routes.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const adminClient = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Alias for consistency with other parts of the app
export const supabaseAdmin = adminClient;
