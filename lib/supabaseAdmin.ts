import { createClient } from '@supabase/supabase-js';

/**
 * Kynar Universe Admin Client
 * * SECURITY WARNING: 
 * This client uses the SERVICE_ROLE_KEY which bypasses all RLS policies.
 * This file MUST NOT be imported into any Client Components ("use client").
 * It is reserved for secure Server-Side fulfillment and Admin tasks.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  if (process.env.NODE_ENV === 'development') {
    console.error("❌ Kynar Critical: SUPABASE_SERVICE_ROLE_KEY is missing. Fulfillment will fail.");
  }
}

export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
