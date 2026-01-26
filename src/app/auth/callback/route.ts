import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Auth Callback Route
 * Handles the exchange of temporary auth codes for permanent user sessions.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Use the 'next' param if it exists, otherwise default to /account
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = await createClient();
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      
      /**
       * Secure Redirect Logic
       * Ensures the user lands on the correct domain regardless of 
       * whether it's local development or a production/preview branch.
       */
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If code exchange fails, send them back to login with a specific error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
