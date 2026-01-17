import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Dynamic redirect: allows users to log in and return to their Cart or Product
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
            // Defensive set for mobile browser compatibility
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              // Handle edge cases where cookies cannot be set in GET routes
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.delete({ name, ...options });
            } catch (error) {
              // Handle edge cases
            }
          },
        },
      }
    );
    
    // Exchange the code for a permanent session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // SUCCESS: The user is now part of the Universe
      // We use absolute URLs for mobile redirect stability
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // ERROR: Return to login with a kinetic error flag for the UI to handle
  return NextResponse.redirect(`${origin}/account?error=Authentication_Failed`);
}
