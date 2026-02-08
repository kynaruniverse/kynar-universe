import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/library';
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || origin;
  
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const fallback = new URL('/auth/login?error=env-missing', siteUrl);
    return NextResponse.redirect(fallback.toString(), 303);
  }
  
  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error) {
        const target = new URL(next, siteUrl);
        return NextResponse.redirect(target.toString(), 303);
      }
      
      console.error('[Auth Callback] Exchange Error:', error.message);
    } catch (err: any) {
      console.error('[Auth Callback] Unexpected Error:', err?.message || err);
    }
  }
  
  const fallback = new URL('/auth/login?error=link-invalid', siteUrl);
  return NextResponse.redirect(fallback.toString(), 303);
}