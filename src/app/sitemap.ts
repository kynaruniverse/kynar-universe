import { MetadataRoute } from 'next'
import { getProducts } from '@/features/products/services/products.server'
import { SITE_CONFIG } from '@/lib/config'

/**
 * Sitemap Generator
 * Creates a search-engine friendly index of all Kynar Universe routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the SITE_CONFIG URL or fall back to the production Netlify URL
  const baseUrl = SITE_CONFIG?.url || 'https://kynar-universev3.netlify.app'
  
  try {
    // FIX: Using getProducts from your server service to fetch all active artifacts
    const products = await getProducts()

    const productUrls = (products || []).map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const staticRoutes: MetadataRoute.Sitemap = [
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
    ]

    return [...staticRoutes, ...productUrls]
  } catch (error) {
    console.error('Sitemap generation failed:', error)
    // Fallback to basic routes if DB fetch fails during build
    return [
      { 
        url: baseUrl, 
        lastModified: new Date() 
      }
    ]
  }
}
