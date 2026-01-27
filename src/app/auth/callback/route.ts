import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/config'

/**
 * Auth Callback Route
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account'

  if (code) {
    const supabase = await createClient()
    
    // 1. Securely exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      
      /**
       * Redirect Strategy:
       * Uses central SITE_CONFIG for environment detection.
       */
      if (SITE_CONFIG.isDev) {
        return NextResponse.redirect(`${origin}${next}`)
      } 
      
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  const errorUrl = new URL('/login', origin)
  errorUrl.searchParams.set('error', 'auth_callback_failed')
  return NextResponse.redirect(errorUrl)
}
