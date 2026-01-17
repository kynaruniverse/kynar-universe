import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kynar-universe-v1.netlify.app';

  // 1. Static Routes
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
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Note for the future:
  // Once you have real products in 3 weeks, you can fetch your 
  // product slugs from Supabase here and map them to:
  // url: `${baseUrl}/marketplace/${product.slug}`
  
  return [...staticRoutes];
}
