import { MetadataRoute } from 'next'
import { getAllProducts } from '@/features/products/services/products.server'
import { SITE_CONFIG } from '@/lib/config' // Using the consolidated config

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG?.url || 'https://kynar-universev3.netlify.app'
  
  try {
    const products = await getAllProducts()

    const productUrls = (products || []).map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/store`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/guides`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ]

    return [...staticRoutes, ...productUrls]
  } catch (error) {
    console.error('Sitemap generation failed:', error)
    return [{ url: baseUrl, lastModified: new Date() }]
  }
}
