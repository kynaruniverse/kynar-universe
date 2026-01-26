import { MetadataRoute } from 'next';
// FIX: Using the function we just added to your server service
import { getAllProducts } from '@/features/products/services/products.server';
// FIX: Direct reference to your constants file
import { SITE_CONFIG } from '@/shared/constants/worlds';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use SITE_CONFIG.url if available, otherwise fallback to env
  const baseUrl = SITE_CONFIG?.url || process.env.NEXT_PUBLIC_APP_URL || 'https://kynar.universe';
  
  try {
    // Get all published products using our fixed service
    const products = await getAllProducts();

    const productUrls = (products || []).map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      // Use updated_at if it exists, otherwise use a safe fallback
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/store`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/guides`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      ...productUrls,
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return the homepage at minimum so the sitemap isn't empty
    return [{ url: baseUrl, lastModified: new Date() }];
  }
}
