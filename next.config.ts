import { withTRPC } from '@trpc/next'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
}

export default nextConfig