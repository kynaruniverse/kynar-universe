import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * SITE MAP GENERATOR
 * Generates dynamic and static routes for search engine indexing.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the production site URL for absolute paths
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://kynaruniverse.co.uk';

  // 1. STATIC ROUTES
  // These are the primary pages of the website.
  const staticRoutes = [
    '',
    '/marketplace',
    '/guides',
    '/help',
    '/terms',
    '/privacy',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. CHECK ENVIRONMENT VARIABLES (The Fix)
  // If keys are missing during build, return static routes only to prevent crash.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Sitemap Build: Supabase credentials missing. Returning static routes only.');
    return staticRoutes;
  }

  // 3. DYNAMIC PRODUCT ROUTES
  // Initialize client only if keys exist
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let productRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('status', 'published');

    if (products) {
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/marketplace/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Sitemap Generation Error:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
