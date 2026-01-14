/* KYNAR UNIVERSE ANALYTICS (js/analytics.js)
   Privacy-focused event tracking engine.
   Status: EVOLVED MASTER (Auto-Tracking + Error Trapping)
*/

const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const DO_NOT_TRACK = navigator.doNotTrack === '1';

/* --- INTERNAL HELPERS --- */
function getTimestamp() {
  return new Date().toISOString();
}

export const Analytics = {
  
  // =========================================
  // 1. CORE LOGGING ENGINE
  // =========================================
  log(event, details = {}) {
    if (DO_NOT_TRACK) return; // Respect User Privacy

    const payload = {
      event,
      details,
      timestamp: getTimestamp(),
      url: window.location.pathname
    };

    if (IS_DEV) {
      // Dev Mode: Visual Feedback
      console.log(`%c[Analytics] ${event}`, 'color: #3b82f6; font-weight: bold;', details);
    } else {
      // Production: Ready for Plausible / GA / Custom Backend
      // sendBeacon is better than fetch for analytics (doesn't block page unload)
      // navigator.sendBeacon('/api/track', JSON.stringify(payload));
    }
  },

  // =========================================
  // 2. EXPLICIT TRACKING METHODS
  // =========================================
  trackPageView(pageName = document.title) {
    this.log('Page View', { title: pageName });
  },
  
  trackProductView(productId, productName) {
    this.log('Product View', { id: productId, name: productName });
  },
  
  trackPurchase(productId, productName, price) {
    this.log('Purchase', { id: productId, name: productName, value: price });
  },
  
  trackSearch(query, resultsCount) {
    this.log('Search', { query, count: resultsCount });
  },
  
  trackThemeChange(theme) {
    this.log('Theme Change', { mode: theme });
  },

  trackError(message, source) {
    this.log('System Error', { message, source });
  },

  // =========================================
  // 3. AUTOMATED LISTENERS (The Evolution)
  // =========================================
  init() {
    // A. Auto-Track Page View
    this.trackPageView();

    // B. Universal Click Tracker (data-track="Button Name")
    // Instead of adding onclick to every button, just add data-track="Buy Button" to HTML
    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('[data-track]');
      if (target) {
        const eventName = target.getAttribute('data-track');
        const eventDetails = target.getAttribute('data-track-details') || 'click';
        this.log('Interaction', { element: eventName, info: eventDetails });
      }
    });

    // C. Scroll Depth Tracker (Did they read the content?)
    let tracked50 = false;
    let tracked100 = false;

    window.addEventListener('scroll', () => {
      if (tracked100) return; // Done tracking

      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      
      if (scrollPercent > 0.5 && !tracked50) {
        this.log('Scroll Depth', { depth: '50%' });
        tracked50 = true;
      }
      if (scrollPercent > 0.95 && !tracked100) {
        this.log('Scroll Depth', { depth: '100%' });
        tracked100 = true;
      }
    }, { passive: true });

    // D. Global Error Trap (Catch crashes)
    window.addEventListener('error', (event) => {
      this.trackError(event.message, event.filename);
    });
  }
};

// Initialize automatically when imported
// Uses requestIdleCallback so it doesn't slow down the initial site load
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => Analytics.init());
} else {
  // Fallback for older browsers (Safari mostly)
  setTimeout(() => Analytics.init(), 1000);
}
