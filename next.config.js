/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. BUILD VALIDATION
  // Ensuring strict type checking and linting to maintain site stability.
  typescript: {
    ignoreBuildErrors: false, 
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 2. DEPENDENCY OPTIMIZATION
  // Required for the smooth execution of 3D components and libraries.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // 3. IMAGE OPTIMIZATION
  // High-fidelity media settings for an optimized visual experience.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Primary Image Hosting (Supabase)
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // External Media Assets
      }
    ],
    // Standard breakpoints for responsive image delivery
    deviceSizes: [640, 828, 1080, 1200, 1920], 
    formats: ['image/avif', 'image/webp'],   
    minimumCacheTTL: 3600, // Balanced caching for improved load times
  },

  // 4. USER EXPERIENCE
  experimental: {
    scrollRestoration: true, // Maintains scroll position during navigation
  },
  
  // 5. SECURITY HEADERS
  // Standard configurations to harden the application against external vulnerabilities.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' https://*.supabase.co https://images.unsplash.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co;"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Privacy-first policy
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
