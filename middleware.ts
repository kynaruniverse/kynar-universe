/**
 * KYNAR UNIVERSE: Auth Middleware (v2.3)
 * Optimized for Next.js 15 Async Headers + Netlify Edge
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/lib/supabase/types'

export async function middleware(request: NextRequest) {
  // 1. Create an initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  // 2. Initialize Supabase with the optimized setAll for Next.js 15
  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          // Update request cookies for the current middleware execution
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          // Re-generate response to include new request state
          response = NextResponse.next({ request })
          
          // Update response cookies for the browser/client storage
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  /**
   * IMPORTANT: We call getUser() to refresh the session if it's expired.
   * This is required for SSR to work correctly with Supabase.
   */
  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl
  
  // 3. Logic: Webhook Bypass
  if (pathname.startsWith('/api/webhooks')) return response

  // 4. Logic: Route Guarding
  const isProtectedRoute = pathname.startsWith('/library') || pathname.startsWith('/account')
  const isAuthRoute = pathname.startsWith('/auth')

  // Redirect to login if accessing protected route without session
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('return_to', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect to library if already logged in and trying to access login pages
  // We ignore logout/callback paths to prevent redirect loops
  if (user && isAuthRoute && !pathname.includes('logout') && !pathname.includes('callback')) {
    return NextResponse.redirect(new URL('/library', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Images/Assets (svg, png, jpg, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
