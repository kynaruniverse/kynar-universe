import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true, // should be inside object
  },
};
  
  // Public environment variables exposed to the client
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL; process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY; process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

export default nextConfig;