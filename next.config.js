/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  // 1. Redirects: Consolidating your logic from _redirects
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/signup',
        permanent: true,
      },
      // Note: /auth/callback is handled automatically by your App Router 
      // Route Handler, so no manual redirect/rewrite is needed here.
    ];
  },

  images: {
    // Mobile-First Optimization - Design System Section 14
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        // Hardened pattern for Supabase projects
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lemonsqueezy.imgix.net',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Technical Canon Section 8: Performance & Reliability
  experimental: {
    // Optimizes package imports for faster mobile loads
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Security Headers for Trust and Privacy
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
