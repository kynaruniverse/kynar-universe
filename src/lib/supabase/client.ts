import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Standard Supabase Browser Client
 * Used for client-side authentication and real-time features.
 * Adheres to: Single Quotes, No Semicolons, 2-Space Indent.
 */
export const supabase = createBrowserClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!
)

// Alias for backwards compatibility with existing feature code
export const browserClient = supabase
