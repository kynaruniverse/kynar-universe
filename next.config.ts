import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        // Your Supabase Storage Domain
        protocol: 'https',
        hostname: 'xobjlrmvezxsshrcykyj.supabase.co',
      },
    ],
  },
}

export default nextConfig
