import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/lib/supabase/types';

/**
 * Proxy middleware for authentication and Supabase SSR cookie sync.
 * - Protects `/library` and `/account` routes.
 * - Redirects unauthenticated users to `/auth/login`.
 * - Passes through webhooks without auth checks.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Supabase SSR client with cookie sync
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      } as CookieOptions,
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Allow webhook requests to pass through
  if (pathname.startsWith('/api/webhooks')) return response;

  // Protect authenticated routes
  const protectedRoutes = ['/library', '/account'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!user && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set('return_to', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}