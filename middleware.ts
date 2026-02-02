import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/api/webhooks')) return response

  // Protected Routes Logic
  const isProtectedRoute = pathname.startsWith('/library') || pathname.startsWith('/account')
  const isAuthRoute = pathname.startsWith('/auth')

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('return_to', pathname)
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute && !pathname.includes('logout')) {
    return NextResponse.redirect(new URL('/library', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
