/* KYNAR SEO ENGINE (js/components/structured-data.js)
   Injects JSON-LD for Google Rich Results.
   Status: FINAL MASTER
*/

export function injectStructuredData(type, data = {}) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';

  let schema = {};

  // 1. GLOBAL WEBSITE SCHEMA
  if (type === 'website') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kynar Universe",
      "url": "https://www.kynaruniverse.co.uk",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.kynaruniverse.co.uk/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  }

  // 2. PRODUCT SCHEMA
  else if (type === 'product') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.title,
      "description": data.description,
      "brand": {
        "@type": "Brand",
        "name": "Kynar Universe"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "price": data.price,
        "availability": "https://schema.org/InStock"
      }
    };
  }

  // 3. ARTICLE SCHEMA (Guides)
  else if (type === 'article') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "author": {
        "@type": "Organization",
        "name": "Kynar Universe"
      },
      "datePublished": new Date().toISOString()
    };
  }

  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
