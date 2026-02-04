/**
 * KYNAR UNIVERSE: Identity Resolution (v2.1)
 * Role: Exchanging the temporary PKCE code for a persistent user session.
 * Fully aligned with Next.js 16 and Production URL resolution.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/library';
  /**
   * Production URL Resolution
   * Ensuring redirects function across local, preview (Netlify), and production.
   */
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  process.env.URL || 
                  origin;
  if (code) {
    const supabase = await createClient();
    // Exchange the PKCE code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Identity confirmed. Constructing absolute path for the Vault.
      const target = new URL(next, siteUrl);
      
      // We use a 303 See Other redirect to ensure a GET request is used on the next hop
      return NextResponse.redirect(target.toString(), 303);
    }
    
    console.error("[Auth Callback] Exchange Error:", error.message);
  }

  // Fallback: If code is missing or exchange fails, return to logic with context
  const fallback = new URL('/auth/login?error=link-invalid', siteUrl);
  return NextResponse.redirect(fallback.toString(), 303);
}
