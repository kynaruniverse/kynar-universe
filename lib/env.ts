// Environment variable validation and type safety

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  lemonSqueezy: {
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ''
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://kynar-universev3.netlify.app',
    env: process.env.NODE_ENV || 'development'
  }
} as const;

export function validateEnv() {
  try {
    env.supabase.url;
    env.supabase.anonKey;
    return true;
  } catch (error) {
    console.error('Environment validation failed:', error);
    return false;
  }
}