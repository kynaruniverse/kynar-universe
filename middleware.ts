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

  // fail-safe check to prevent 500 crash on Netlify
  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Optimized for Netlify Edge: single response mutation
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Essential for refreshing sessions
  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl
  
  // 1. Immediate exit for webhooks (Avoids auth overhead)
  if (pathname.startsWith('/api/webhooks')) return response

  // 2. Protected Routes Logic
  const isProtectedRoute = pathname.startsWith('/library') || pathname.startsWith('/account')
  const isAuthRoute = pathname.startsWith('/auth')

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('return_to', pathname)
    return NextResponse.redirect(url)
  }

  // 3. Prevent logged-in users from accessing login/signup
  if (user && isAuthRoute && !pathname.includes('logout')) {
    return NextResponse.redirect(new URL('/library', request.url))
  }

  return response
}

export const config = {
  // Optimized matcher to exclude all static assets and metadata
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ],
}
