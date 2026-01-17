/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. MOBILE CONVENIENCE: Useful for rapid deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. KINETIC ASSETS: Essential for 3D library stability on mobile
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // 3. IMAGE DELIVERY: Optimized for Supabase & Remote Assets
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Explicitly trust your Supabase storage
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For your placeholder hero images
      },
      {
        protocol: 'https',
        hostname: '**', // Keep as fallback for now
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200], 
    formats: ['image/avif', 'image/webp'],   
  },

  // 4. SECURITY & UX
  experimental: {
    scrollRestoration: true, // Prevents "jarring" jumps on mobile back-button
  },
  
  // 5. PRODUCTION HEADERS: Prevents "Clickjacking" and improves security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
