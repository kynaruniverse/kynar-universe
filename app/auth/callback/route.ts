/**
 * KYNAR UNIVERSE: Auth Callback Handler (v1.5)
 * Role: Exchanges PKCE code for a session and redirects the user.
 * Technical: Essential for Email Magic Links and OAuth (Google/GitHub).
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  // The 'code' is the temporary exchange token sent by Supabase
  const code = searchParams.get('code');
  
  // 'next' allows us to return the user to the page they were originally on
  const next = searchParams.get('next') ?? '/library';

  if (code) {
    const supabase = await createClient();
    
    // Exchange the code for a browser session (cookies)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Success: Send them to their destination (default: Library)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // FAIL: If code is missing or exchange fails, send them to an error page
  // TIP: Create a simple /auth/auth-error page later for better UX
  return NextResponse.redirect(`${origin}/auth/login?error=auth-code-error`);
}
