/* KYNAR ANALYTICS ENGINE (js/analytics.js)
   The Privacy-First Observation Deck.
   Currently in "Dev Mode" (Console Logging only).
   Status: FINAL MASTER
*/

export const Analytics = {
  
  /**
   * Initialize the Analytics Engine
   * (e.g., Load Plausible/Google Analytics scripts here later)
   */
  init: () => {
    console.log('[Universe] Analytics: Initialized (Privacy Mode)');
  },

  /**
   * Track specific user actions
   * @param {string} eventName - Name of the action (e.g., 'Download')
   * @param {object} props - Extra details (e.g., { item: 'Finance Tracker' })
   */
  trackEvent: (eventName, props = {}) => {
    // DEV MODE: Log to console
    console.log(`[Analytics] Event: ${eventName}`, props);

    // FUTURE INTEGRATION EXAMPLE:
    // if(window.plausible) window.plausible(eventName, { props });
  },

  /**
   * Track Page Views (SPA Support)
   * Call this when navigating between dynamic pages
   */
  trackPageView: (path) => {
    console.log(`[Analytics] Page View: ${path}`);
  },

  /**
   * Specific: Track Theme/Atmosphere Changes
   */
  trackThemeChange: (mode) => {
    console.log(`[Analytics] Atmosphere Shift: ${mode}`);
    // You could save this to user preferences in DB later
  }
};

// Auto-Init on Load
document.addEventListener('DOMContentLoaded', () => {
  Analytics.init();
});
