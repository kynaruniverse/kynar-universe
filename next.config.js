/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  // Localization - Business Reference Section 13 (UK-First)
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
  },

  images: {
    // Mobile-First Optimization - Design System Section 14
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lemonsqueezy.imgix.net',
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
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
