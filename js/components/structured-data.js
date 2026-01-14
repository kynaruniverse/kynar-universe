/* KYNAR UNIVERSE STRUCTURED DATA (js/components/structured-data.js)
   Status: EVOLVED MASTER (Rich Results Optimized + Breadcrumb Support)
*/

export function injectStructuredData(type, data) {
  // 1. CLEANUP: Ensure no duplicate schemas
  const existing = document.querySelectorAll('script[type="application/ld+json"]');
  existing.forEach(script => script.remove());

  let schema = null;
  const baseUrl = "https://kynaruniverse.co.uk"; // Cleaned URL

  // 2. SCHEMA DEFINITIONS
  switch (type) {
    case 'website':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kynar Universe",
        "url": baseUrl,
        "description": "The Digital Department Store for high-performers and creators.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/index.html?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
      break;

    case 'product':
      if (!data) break;
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.title,
        "image": data.image ? `${baseUrl}/${data.image}` : `${baseUrl}/assets/share-preview.jpg`,
        "description": data.description || data.shortDesc,
        "sku": data.id,
        "brand": { "@type": "Brand", "name": "Kynar Universe" },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "GBP",
          "price": data.price,
          "availability": "https://schema.org/InStock"
        }
      };
      break;

    case 'article':
      if (!data) break;
      const pubDate = !isNaN(Date.parse(data.date)) ? new Date(data.date).toISOString() : new Date().toISOString();
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "datePublished": pubDate,
        "author": { "@type": "Organization", "name": "Kynar Universe" },
        "publisher": {
          "@type": "Organization",
          "name": "Kynar Universe",
          "logo": { "@type": "ImageObject", "url": `${baseUrl}/assets/logo.svg` }
        }
      };
      break;

    case 'breadcrumb':
      if (!data || !data.items) break;
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `${baseUrl}/${item.path}`
        }))
      };
      break;
  }

  // 3. INJECTION
  if (schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
