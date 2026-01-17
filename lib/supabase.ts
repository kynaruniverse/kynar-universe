import { createClient } from '@supabase/supabase-js';

// 1. EXTRACTION
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. VALIDATION (Fail fast in development)
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "KYNAR ERROR: Supabase Environment Variables are missing. Check your Netlify settings."
  );
}

// 3. SECURE INITIALIZATION
export const supabase = createClient(
  supabaseUrl, 
  supabaseKey,
  {
    auth: {
      persistSession: true, 
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'kynar-universe-auth', // Custom key prevents conflicts with other projects
    },
    global: {
      headers: { 'x-application-name': 'kynar-universe-v1' },
    },
    // Optimization for high-speed Kinetic data fetching
    db: {
      schema: 'public',
    },
  }
);
