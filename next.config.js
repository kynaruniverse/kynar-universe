/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. BUILD VALIDATION
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 2. DEVELOPMENT SERVER CONFIG

  publicRuntimeConfig: {
    staticFolder: '/public',
  },

  // 3. DEPENDENCY OPTIMIZATION
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // 4. IMAGE OPTIMIZATION
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },

  // 5. USER EXPERIENCE
  experimental: {
    scrollRestoration: true,
  },

  // 6. SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' https://*.supabase.co https://images.unsplash.com data: blob:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://*.supabase.co",
              "frame-ancestors 'self' https://replit.com https://*.replit.app"
            ].join('; ')
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }
        ]
      }
    ]
  }
};

module.exports = nextConfig;