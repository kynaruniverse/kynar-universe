import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * THE MUSE CURATOR (Middleware)
 * Manages the silent authentication flow and registry access.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  // 1. SESSION SYNCHRONIZATION
  // Ensures uninterrupted access to the private vault.
  const { data: { user } } = await supabase.auth.getUser()

  // 2. REGISTRY PROTECTION
  // Redirects unauthenticated guests trying to access curated private spaces.
  const isProtectedPath = request.nextUrl.pathname.startsWith('/account') || 
                          request.nextUrl.pathname.startsWith('/cart')

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/account' 
    url.searchParams.set('message', 'authentication_required')
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Optimized Matcher: Ensures the Muse Engine is performant 
     * by ignoring all static and physical media assets.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
