/**
 * KYNAR UNIVERSE: Supabase OAuth Callback
 * Refactor: Type-safe, modular, and clear redirect/error flow
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  const code = searchParams.get("code");
  const nextPath = searchParams.get("next") ?? "/library";
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || origin;
  
  // --- Environment validation ---
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const fallback = new URL("/auth/login?error=env-missing", siteUrl);
    return NextResponse.redirect(fallback.toString(), 303);
  }
  
  // --- OAuth Code Exchange ---
  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error) {
        const targetUrl = new URL(nextPath, siteUrl);
        return NextResponse.redirect(targetUrl.toString(), 303);
      }
      
      console.error("[Auth Callback] Code Exchange Error:", error.message);
    } catch (err: unknown) {
      console.error(
        "[Auth Callback] Unexpected Error:",
        (err as Error)?.message || err
      );
    }
  }
  
  // --- Fallback for missing or invalid code ---
  const fallback = new URL("/auth/login?error=link-invalid", siteUrl);
  return NextResponse.redirect(fallback.toString(), 303);
}