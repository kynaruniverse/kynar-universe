/**
 * Centralized Configuration Engine
 * Standardized to Single Quotes and No Semicolons
 */

export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Kynar Universe',
  },
} as const

// Validation to catch missing keys early in the "Engine Room"
if (!config.supabase.url || !config.supabase.anonKey) {
  console.warn('⚠️ Critical: Supabase environment variables are missing!')
}
