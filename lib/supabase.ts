import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { env } from './env';

export const supabase = createClient < Database > (
  env.supabase.url,
  env.supabase.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);