import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * SITE MAP GENERATOR
 * Generates dynamic and static routes for search engine indexing.
 */

// Initialize Database Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  // 2. DYNAMIC PRODUCT ROUTES
  // Fetches all active products to ensure they are indexed by search engines.
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
    // Graceful Error Handling: Log the error without breaking the sitemap generation
    console.error('Sitemap Generation Error:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
