import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/lib/supabase/types'

// FIXED: Export named 'proxy' function (Next.js 16 requirement)
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })
  
  const supabase = createServerClient < Database > (
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )
  
  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/api/webhooks')) return response
  
  const isProtectedRoute = pathname.startsWith('/library') || pathname.startsWith('/account')
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('return_to', pathname)
    return NextResponse.redirect(url)
  }
  
  return response
}