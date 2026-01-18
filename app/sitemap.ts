import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

/**
 * THE REGISTRY INDEX (Sitemap)
 * Provides curators with the formal manifest of all public Muse Engine assets.
 */

// Muse Engine Client: Initialized for registry discovery
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ALIGNMENT: Prioritize the primary production origin
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://kynaruniverse.co.uk';

  // 1. CURATED PUBLIC ROUTES
  // These represent the foundational pillars of the experience.
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

  // 2. ASSET DISCOVERY (Dynamic Product Routes)
  // Synchronizes the public registry with the storefront to ensure index integrity.
  let productRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at');

    if (products) {
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/marketplace/${product.slug}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    // Silence is luxury: Log the interruption but maintain engine stability
    console.error('Registry Discovery Interrupted:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
