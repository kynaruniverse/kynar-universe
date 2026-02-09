/* KYNAR UNIVERSE: Supabase Client (v1.2) */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Browser Supabase client for client components
 * Uses the anon key only; safe for frontend usage
 */
export const supabaseBrowser = createSupabaseClient < Database > (
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

/**
 * Factory function for compatibility
 * Returns the singleton browser client
 */
export const createClient = (): typeof supabaseBrowser => supabaseBrowser;