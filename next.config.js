/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  // Redirect rules (existing)
  async redirects() {
    return [
      { source: '/login', destination: '/auth/login', permanent: true },
      { source: '/signup', destination: '/auth/signup', permanent: true },
    ];
  },

  // Image optimization (existing)
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
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

  // Experimental features (existing)
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Headers (existing)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // --- ADD THIS BLOCK AT THE END ---
  swcMinify: false,                // disable native SWC minification
  compiler: {
    swcLoader: false,              // force JS fallback
  },
  outputFileTracingRoot: __dirname, // avoid workspace root warnings
};

module.exports = nextConfig;