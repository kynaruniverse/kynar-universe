import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'
import { SUPABASE_CONFIG } from '@/lib/config'

/**
 * Supabase Admin Client (Service Role)
 * Bypasses RLS - ONLY USE ON THE SERVER.
 * Used for webhooks, cron jobs, and admin-level overrides.
 */

// Safety check: The service key must exist for the admin client to function
if (!SUPABASE_CONFIG.serviceKey) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in production environment.')
  }
}

export const supabaseAdmin = createClient<Database>(
  SUPABASE_CONFIG.url!,
  SUPABASE_CONFIG.serviceKey!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
