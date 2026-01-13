/* KYNAR UNIVERSE ANALYTICS (js/analytics.js)
   Privacy-focused event tracking wrapper.
   Status: PRODUCTION READY (Smart Logging)
*/

const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const DO_NOT_TRACK = navigator.doNotTrack === '1';

export const Analytics = {
  
  // Internal Logger
  log(event, details) {
    // Only log if we are in Dev mode AND the user hasn't opted out of tracking
    if (IS_DEV && !DO_NOT_TRACK) {
      console.log(`[Analytics] ${event}:`, details);
    }
    // In the future, this is where you would send data to Plausible/Fathom
    // if (!DO_NOT_TRACK) { sendToService(event, details); }
  },

  // 1. Page Views
  trackPageView(pageName) {
    this.log('Page View', pageName);
  },
  
  // 2. Product Views
  trackProductView(productId, productName) {
    this.log('Product View', `${productName} (${productId})`);
  },
  
  // 3. Purchases
  trackPurchase(productId, productName, price) {
    this.log('Purchase', `${productName} - £${price}`);
  },
  
  // 4. Search Queries
  trackSearch(query, resultsCount) {
    this.log('Search', `"${query}" - ${resultsCount} results`);
  },
  
  // 5. Theme Changes
  trackThemeChange(theme) {
    this.log('Theme Change', theme);
  }
};

// Auto-track page view on load
// We use 'once' to ensure it doesn't fire multiple times if imported elsewhere
document.addEventListener('DOMContentLoaded', () => {
  Analytics.trackPageView(document.title);
}, { once: true });
