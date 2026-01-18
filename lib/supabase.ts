import { createClient } from '@supabase/supabase-js';

/**
 * MUSE ENGINE DATA CORE
 * Establishes the secure handshake with the private registry.
 */

// 1. ENVIRONMENT EXTRACTION
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. REGISTRY VALIDATION
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "MUSE ENGINE ERROR: Registry credentials are not established. Verify environment configuration."
  );
}

// 3. SECURE HANDSHAKE INITIALIZATION
export const supabase = createClient(
  supabaseUrl, 
  supabaseKey,
  {
    auth: {
      persistSession: true, 
      autoRefreshToken: true,
      detectSessionInUrl: true,
      // Muse Engine Storage Key: Aligned with the manifest logic
      storageKey: 'kynar-muse-registry', 
    },
    global: {
      headers: { 'x-application-name': 'kynar-muse-engine-v1' },
    },
    // Optimized for stable, unhurried data synchronization
    db: {
      schema: 'public',
    },
  }
);
