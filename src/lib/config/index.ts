/**
 * Centralized Configuration Engine
 * Standardized to Single Quotes and No Semicolons
 */

const _env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kynar-universev3.netlify.app',
  lemonSqueezySecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'production',
}

export const SITE_CONFIG = {
  url: _env.siteUrl,
  name: 'Kynar Universe',
  isDev: _env.nodeEnv === 'development',
} as const

export const SUPABASE_CONFIG = {
  url: _env.supabaseUrl,
  anonKey: _env.supabaseAnonKey,
  serviceKey: _env.supabaseServiceKey,
} as const

export const LEMON_CONFIG = {
  webhookSecret: _env.lemonSqueezySecret,
} as const

// Validation to catch missing keys early
if (!_env.supabaseUrl || !_env.supabaseAnonKey) {
  console.warn('⚠️ Critical: Supabase public environment variables are missing!')
}

export const appConfig = {
  supabase: SUPABASE_CONFIG,
  site: SITE_CONFIG,
  lemon: LEMON_CONFIG,
} as const
