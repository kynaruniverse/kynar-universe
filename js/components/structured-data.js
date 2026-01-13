/* KYNAR UNIVERSE STRUCTURED DATA (js/components/structured-data.js)
   Injects JSON-LD schema for better SEO.
   Status: FINAL MASTER (Schema Validated)
*/

export function injectStructuredData(type, data) {
  // Remove existing structured data to prevent duplicates
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) existing.remove();

  let schema = null;
  const baseUrl = "https://www.kynaruniverse.co.uk";

  if (type === 'website') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kynar Universe",
      "url": baseUrl,
      "description": "The ultimate Digital Department Store. Production-ready tools, planners, and systems for developers, high-performers, and families.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  } 
  else if (type === 'product' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.title,
      "description": data.description || data.shortDesc,
      // Fallback image if product specific one isn't absolute
      "image": `${baseUrl}/assets/share-preview.jpg`,
      "brand": {
        "@type": "Brand",
        "name": "Kynar Universe"
      },
      "offers": {
        "@type": "Offer",
        "price": data.price,
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "url": window.location.href
      },
      "category": data.category
    };
  } 
  else if (type === 'article' && data) {
    // FIX: JSON-LD requires ISO Date format. 
    // If data.date is text (e.g. "Verified Guide"), we use the current time as fallback.
    const isValidDate = !isNaN(Date.parse(data.date));
    const publishDate = isValidDate ? new Date(data.date).toISOString() : new Date().toISOString();

    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.shortDesc || "A verified guide from the Kynar Knowledge Library.",
      "author": {
        "@type": "Organization",
        "name": "Kynar Universe"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kynar Universe",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/assets/logo.svg` // Confirmed SVG usage
        }
      },
      "datePublished": publishDate,
      "mainEntityOfPage": window.location.href
    };
  }

  if (schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
