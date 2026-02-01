/**
 * KYNAR UNIVERSE: Auth & Session Middleware (v1.5)
 * Role: Edge-level session refreshing and protected route enforcement.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) return response

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Fixed: Syncing cookies to both request and response correctly
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Refresh session
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  
  // 2. PROTECTED ROUTES
  const isLibraryRoute = pathname.startsWith('/library')
  const isAccountRoute = pathname.startsWith('/account')
  const isAuthRoute = pathname.startsWith('/auth')
  const isApiRoute = pathname.startsWith('/api')

  // Bypass middleware logic for Webhooks to prevent body-parsing interference
  if (pathname.startsWith('/api/webhooks')) {
    return response
  }

  // Auth Guard: Private -> Login
  if (!user && (isLibraryRoute || isAccountRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('return_to', pathname)
    return NextResponse.redirect(url)
  }

  // Auth Guard: Auth -> Library (Prevent double-login)
  if (user && isAuthRoute && !pathname.includes('logout')) {
    const url = request.nextUrl.clone()
    url.pathname = '/library'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and public files.
     * Hardened to ensure Edge Functions don't over-fire on images.
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
