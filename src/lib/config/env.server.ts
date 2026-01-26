export const serverEnv = {
  supabase: {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  lemonSqueezy: {
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
  },
} as const;