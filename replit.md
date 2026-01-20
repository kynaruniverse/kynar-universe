# Kynar Universe

A premium digital marketplace and secure storefront built with Next.js and Supabase.

## Overview

This is a Next.js 14 application featuring:
- React 18 with TypeScript
- Supabase for authentication and database
- Three.js with React Three Fiber for 3D graphics
- Tailwind CSS for styling
- Framer Motion for animations

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/context` - React context providers
- `/lib` - Utility functions (Supabase client, storage, theme)
- `/public` - Static assets

## Development

The app runs on port 5000 with the command:
```
npm run dev -- -p 5000 -H 0.0.0.0
```

## Environment Variables

This project requires Supabase credentials to enable authentication:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `NEXT_PUBLIC_SITE_URL` - The public URL of your site

See `.env.example` for the full list.

## Recent Changes

- 2026-01-20: Configured for Replit environment
  - Updated middleware to handle missing Supabase credentials gracefully
  - Removed X-Frame-Options header to allow iframe preview
  - Configured dev server for port 5000
