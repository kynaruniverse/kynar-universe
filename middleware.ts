// ✅ FIX 1: Lowercase 'import'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/** AUTHENTICATION MIDDLEWARE: Manages user sessions and route access **/
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 1. SESSION VALIDATION: Retrieve current user data safely from Supabase
  const { data: { user } } = await supabase.auth.getUser()

  // 2. ROUTE PROTECTION
  // Logic: Allow access to /account (Login page), but protect /account/* subroutes and /cart
  const isProtectedPath = 
    (request.nextUrl.pathname.startsWith('/account') &&
      request.nextUrl.pathname !== '/account') ||
    request.nextUrl.pathname.startsWith('/cart');

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    // Prevent redirect loop - don't redirect if already on /account
    if (url.pathname !== '/account') {
      url.pathname = '/account'
      url.searchParams.set('message', 'authentication_required')
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * MATCH FILTER: Optimizes performance by excluding static files
     * and image assets from the middleware logic.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
