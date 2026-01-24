// Helper to enforce required variables
// We pass the value in explicitly to ensure the bundler sees it
function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  supabase: {
    // PUBLIC: Available on Client & Server
    // We must access process.env.VAR_NAME directly for Next.js to inline it
    url: requireEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    anonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    
    // PRIVATE: Server-side only (will be undefined on client)
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  lemonSqueezy: {
    // PRIVATE: Server-side only
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://kynar-universev3.netlify.app',
    environment: process.env.NODE_ENV || 'development',
  }
} as const;

/**
 * Simple check to ensure critical config is loaded.
 * Call this in your root layout or middleware if you want to fail fast.
 */
export function validateEnv() {
  try {
    // Accessing properties will trigger the requireEnv check
    const check = env.supabase.url && env.supabase.anonKey;
    return !!check;
  } catch (error) {
    console.error('Environment validation failed:', error);
    return false;
  }
}
