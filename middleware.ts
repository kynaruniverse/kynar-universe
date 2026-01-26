import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/lib/config/env.client';
export async function middleware(request: NextRequest) {
  // 1. Create the initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Initialize Supabase Client with the modern getAll/setAll pattern
  const supabase = createServerClient(
      env.supabase.url,
      env.supabase.anonKey,
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

  // 3. Refresh the session
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Protection Logic
  const path = request.nextUrl.pathname;
  // CSRF protection for admin actions
  if (path.startsWith('/api') && request.method === 'POST') {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://kynar-universev3.netlify.app',
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean);
  
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  // Protect Account page
  if (!user && path.startsWith('/account')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectedFrom', path);
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from seeing Auth pages
  if (user && (path.startsWith('/login') || path.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/webhook (IMPORTANT: Exclude Lemon Squeezy webhooks)
     * - All image extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|api/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
