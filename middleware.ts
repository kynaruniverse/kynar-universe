import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Initialize Supabase SSR Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
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

  // 2. Refresh / Get User (Crucial for session persistence)
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // 3. Security: Origin Validation for API POSTs
  if (path.startsWith('/api') && request.method === 'POST') {
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://kynar-universev3.netlify.app',
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean)

    if (origin && !allowedOrigins.includes(origin as string)) {
      return new NextResponse('Access Forbidden', { status: 403 })
    }
  }

  // 4. Protection Logic: Account & Library
  if (!user && path.startsWith('/account')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectedFrom', path)
    return NextResponse.redirect(url)
  }

  // 5. Auth Flow Logic: Prevent logged-in users from seeing Auth screens
  if (user && (path.startsWith('/login') || path.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/webhook (Lemon Squeezy needs public access)
     * - Public assets (svg, png, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
