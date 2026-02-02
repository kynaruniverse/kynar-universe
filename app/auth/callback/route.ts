/**
 * KYNAR UNIVERSE: Auth Callback Handler (v1.6)
 * Role: Exchanges PKCE code for a persistent session.
 * Handlers: Magic Links, OAuth (Google), and Password Resets.
 * Environment: Next.js 15 Server Route.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  // 1. Extraction of the Exchange Code & Redirection Path
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/library';

  /**
   * Kynar Security Protocol:
   * We prioritize the 'origin' from the request, but allow for a fallback 
   * to the NEXT_PUBLIC_SITE_URL to prevent mobile deep-linking failures.
   */
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  if (code) {
    const supabase = await createClient();
    
    // 2. The Handshake: Exchange the temporary code for a secure cookie session
    // This is the PKCE (Proof Key for Code Exchange) flow.
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // SUCCESS: User identity is confirmed.
      // We use a 303 'See Other' for clean mobile browser redirects.
      return NextResponse.redirect(`${baseUrl}${next}`, 303);
    }

    // LOG: Log error for internal monitoring (Optional)
    console.error("[Auth Callback] Exchange Error:", error.message);
  }

  /**
   * FAILURE STATE:
   * If the code is invalid, expired, or missing, we return the user 
   * to the login gate with a specific error code for the UI.
   */
  return NextResponse.redirect(`${baseUrl}/login?error=link-invalid`, 303);
}
