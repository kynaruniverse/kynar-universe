import { createClient } from '@supabase/supabase-js';

// This uses the SECRET SERVICE ROLE KEY (Netlify Env Var)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
