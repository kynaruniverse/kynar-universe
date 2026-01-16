import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

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
            cookieStore.set(name, value, options);
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Success! Go to account
      return NextResponse.redirect(`${origin}/account`);
    }
  }

  // ERROR HANDLING:
  // Instead of going to a 404 page, go back to Account with an error flag
  return NextResponse.redirect(`${origin}/account?error=AuthFailed`);
}
