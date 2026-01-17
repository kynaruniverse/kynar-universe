import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // If 'next' is present, we send them there (e.g., back to Cart), otherwise to Account
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              // Middleware will handle session refresh if this fails in a GET
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options });
            } catch (error) {
              // Handle error
            }
          },
        },
      }
    );
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // SUCCESS: Session Established
      // We append a timestamp to the redirect to force a fresh UI load on mobile
      const successUrl = new URL(next, origin);
      successUrl.searchParams.set('verified', 'true');
      
      return NextResponse.redirect(successUrl);
    }
  }

  // ERROR: Redirect to Account with kinetic error signal
  const errorUrl = new URL('/account', origin);
  errorUrl.searchParams.set('error', 'auth_transmission_failed');
  
  return NextResponse.redirect(errorUrl);
}
