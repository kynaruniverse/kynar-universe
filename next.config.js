/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. REGISTRY INTEGRITY
  // Luxury builds require total structural validity. 
  // We move away from ignoring errors to ensure engine stability.
  typescript: {
    ignoreBuildErrors: false, 
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 2. MUSE CORE STABILITY
  // Essential for the silent, smooth execution of 3D library assets.
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // 3. ASSET DELIVERY PROTOCOL
  // High-fidelity image optimization for a refined visual experience.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Trusted Registry Storage
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Editorial Content
      }
    ],
    // Optimized for the specific breakpoints of the Muse Engine
    deviceSizes: [640, 828, 1080, 1200, 1920], 
    formats: ['image/avif', 'image/webp'],   
    minimumCacheTTL: 3600, // Reduced server load for a "Calm" backend
  },

  // 4. UX HARMONY
  experimental: {
    scrollRestoration: true, // Ensures "Quiet" navigation continuity
  },
  
  // 5. THE TRUST PROTOCOL: Security Headers
  // Hardening the engine against external intrusion.
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // Minimalist privacy
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
