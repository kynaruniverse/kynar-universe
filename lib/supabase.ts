import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE CLIENT CONFIGURATION
 * Initializes the connection to the database and authentication services.
 */

// 1. ENVIRONMENT VARIABLE EXTRACTION
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. CONFIGURATION VALIDATION
if (!supabaseUrl || !supabaseKey) {
  console.warn("DATABASE CONFIG WARNING: Supabase credentials are missing. Some features will be disabled.");
}

// 3. CLIENT INITIALIZATION
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder',
  {
    auth: {
      persistSession: true, 
      autoRefreshToken: true,
      detectSessionInUrl: true,
      // Authentication Storage Key
      storageKey: 'kynar-auth-session', 
    },
    global: {
      headers: { 'x-application-name': 'kynar-digital-v1' },
    },
    // Standard database configuration
    db: {
      schema: 'public',
    },
  }
);
