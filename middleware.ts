import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Create the initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Initialize Supabase Client using process.env directly
  // This bypasses the broken @/lib/config/env.client import
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Refresh the session (Essential for keeping users logged in)
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Protection Logic
  const path = request.nextUrl.pathname;

  // CSRF protection for API actions
  if (path.startsWith('/api') && request.method === 'POST') {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://kynar-universev3.netlify.app',
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean);
  
    if (origin && !allowedOrigins.includes(origin as string)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Protect Account page: Redirect to login if no user
  if (!user && path.startsWith('/account')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectedFrom', path);
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from seeing Auth pages: Redirect to account
  if (user && (path.startsWith('/login') || path.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and webhooks
     */
    '/((?!_next/static|_next/image|favicon.ico|api/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
