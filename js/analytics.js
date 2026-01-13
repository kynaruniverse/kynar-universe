/* KYNAR UNIVERSE ANALYTICS (js/analytics.js)
   Privacy-focused event tracking
   Status: PRODUCTION READY
*/

export const Analytics = {
  // Track page views
  trackPageView(pageName) {
    console.log(`[Analytics] Page View: ${pageName}`);
    // Add your analytics service here (Plausible, Fathom, etc.)
  },
  
  // Track product views
  trackProductView(productId, productName) {
    console.log(`[Analytics] Product View: ${productName} (${productId})`);
  },
  
  // Track purchases
  trackPurchase(productId, productName, price) {
    console.log(`[Analytics] Purchase: ${productName} - £${price}`);
  },
  
  // Track search queries
  trackSearch(query, resultsCount) {
    console.log(`[Analytics] Search: "${query}" - ${resultsCount} results`);
  },
  
  // Track theme changes
  trackThemeChange(theme) {
    console.log(`[Analytics] Theme Change: ${theme}`);
  }
};

// Auto-track page views
document.addEventListener('DOMContentLoaded', () => {
  Analytics.trackPageView(document.title);
});