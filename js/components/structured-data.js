/* KYNAR UNIVERSE STRUCTURED DATA (js/components/structured-data.js)
   Injects JSON-LD schema for better SEO.
   Status: PHASE 5 - SEO Enhancement
*/

export function injectStructuredData(type, data) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) existing.remove();

  let schema = null;

  if (type === 'website') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kynar Universe",
      "url": "https://www.kynaruniverse.co.uk",
      "description": "The ultimate Digital Department Store. Production-ready tools, planners, and systems for developers, high-performers, and families.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.kynaruniverse.co.uk/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  } else if (type === 'product' && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.title,
      "description": data.description,
      "image": "https://www.kynaruniverse.co.uk/assets/share-preview.jpg",
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
  } else if (type === 'article' && data) {
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
          "url": "https://www.kynaruniverse.co.uk/assets/logo.svg"
        }
      },
      "datePublished": data.date || new Date().toISOString(),
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