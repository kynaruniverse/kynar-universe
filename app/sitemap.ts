import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

// Setup a basic client for sitemap generation (Build-time only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ALIGNMENT: Ensure this matches your final production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kynar-universe-v1.netlify.app';

  // 1. CORE SECTOR ROUTES
  const staticRoutes = [
    '',
    '/marketplace',
    '/guides',
    '/help',
    '/terms',
    '/privacy',
    '/about',
    '/account',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. DYNAMIC PRODUCT ROUTES
  // This logic is ready for your "3-week" launch. 
  // It fetches all slugs from Supabase to ensure Google indexes every product.
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
    console.error('Sitemap Signal Interrupted:', error);
  }

  return [...staticRoutes, ...productRoutes];
}
