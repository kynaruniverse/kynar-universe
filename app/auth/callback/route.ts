import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/library';

  // Netlify/Production URL resolution
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (process.env.URL) || 
                  new URL(request.url).origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Use absolute URL to prevent redirect issues on mobile browsers
      const target = new URL(next, siteUrl);
      return NextResponse.redirect(target.toString(), 303);
    }
    console.error("[Auth Callback] Exchange Error:", error.message);
  }

  const fallback = new URL('/auth/login?error=link-invalid', siteUrl);
  return NextResponse.redirect(fallback.toString(), 303);
}
