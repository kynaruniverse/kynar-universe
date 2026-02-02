/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  async redirects() {
    return [
      { source: '/login', destination: '/auth/login', permanent: true },
      { source: '/signup', destination: '/auth/signup', permanent: true },
    ];
  },

  images: {
    // Optimized for mobile-first/low-bandwidth scenarios
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lemonsqueezy.imgix.net',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    // Next 15 specific optimization
    optimizePackageImports: ['lucide-react', 'framer-motion', 'zustand', 'date-fns'],
  },

  // Headers moved to Netlify.toml for global edge consistency 
  // or kept here for local dev consistency. 
  // recommendation: Keep application-specific logic here.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions Policy for mobile hardware privacy
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
