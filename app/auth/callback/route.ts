import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * AUTHENTICATION CALLBACK
 * Finalizes the login process and initializes the user session.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // Default redirect to the account dashboard
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
              // Handled by Middleware
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options });
            } catch (error) {
              // Silently fail
            }
          },
        },
      }
    );
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // SUCCESS: Session Created
      const successUrl = new URL(next, origin);
      successUrl.searchParams.set('verified', 'true');

      // If the user was looking at a specific category before auth, 
      // we keep that theme active upon their return.
      const category = searchParams.get('category');
      if (category) successUrl.searchParams.set('category', category);

      return NextResponse.redirect(successUrl);

    }
  }

  // ERROR: Authentication Failed
  const errorUrl = new URL('/account', origin);
  // Trigger a neutral 'Digital' (Default) error state
  errorUrl.searchParams.set('error', 'Authentication failed. Please try again.');
  errorUrl.searchParams.set('category', 'Default'); 

  
  return NextResponse.redirect(errorUrl);
}
