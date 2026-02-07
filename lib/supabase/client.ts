import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Browser Supabase client for client components
 * Use anon key only
 */
export const supabaseBrowser = createSupabaseClient < Database > (
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Alias for compatibility - components expect createClient
 */
export const createClient = () => {
  return supabaseBrowser;
};