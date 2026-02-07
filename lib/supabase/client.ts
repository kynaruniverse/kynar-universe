import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Browser Supabase client for client components
 * Use anon key only
 */
export const supabaseBrowser = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);