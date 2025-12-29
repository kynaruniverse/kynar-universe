/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR HAPTIC ENGINE (V2.0 - VISUALFORGE SYNC)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Tactile feedback engine. Translates digital actions into 
 * physical sensations for a premium, app-like feel on mobile.
 */

const KynarHaptics = {
  // 1. CONFIGURATION
  enabled: true,
  lastFired: 0,
  cooldown: 80, // Slightly faster response time for snappier feel

  // 2. TACTILE PATTERNS
  light: () => {
    KynarHaptics.trigger(5); // Very subtle "tick"
  },

  medium: () => {
    KynarHaptics.trigger(12); // Standard button press
  },

  heavy: () => {
    KynarHaptics.trigger([10, 50, 40]); // Error or heavy impact
  },

  success: () => {
    KynarHaptics.trigger([5, 50, 20]); // "Da-ding" sensation
  },

  // 3. CORE TRIGGER ENGINE
  trigger(pattern) {
    const now = Date.now();
    // Only run on devices that support vibration
    if (!this.enabled || !navigator.vibrate) return;
    
    // Throttle to prevent "buzzing" overload
    if (now - this.lastFired < this.cooldown) return;

    try {
        navigator.vibrate(pattern);
    } catch(e) {
        // Silently fail on unsupported devices/browsers
    }
    this.lastFired = now;
  },

  // 4. AUTO-BINDER ENGINE
  init() {
    // Only run on touch devices
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isMobile) return;

    // V2 INTERACTION TARGETS (Updated for VisualForge Architecture)
    const targets = [
      // Primary Actions
      ".dock-btn",        // Main Buttons
      ".modal-btn",       // Auth Buttons
      ".action-btn",      // Product Page Sticky
      ".pay-btn",         // Checkout Button
      
      // Navigation & Layout
      ".nav-item",        // Library Links
      ".drawer-link",     // Drawer Menu Items
      ".header-btn",      // Header Icons (Search/Cart)
      ".close-btn",       // Drawer Close X
      "#close-access",    // Modal Close X
      ".tab-btn",         // Vault/Library Tabs
      
      // Cards & Interactive Lists
      ".stream-card",     // Horizontal Scroll Cards
      ".product-node",    // Shop Grid Items
      ".feature-card",    // Generic Cards
      ".asset-card",      // Vault Items
      ".spec-trigger",    // Accordion Headers
      ".filter-pill",     // Shop Filters
      
      // Generic Inputs (Focus Haptics)
      "input",
      "button"
    ];

    // PASSIVE LISTENER: Adds haptics to all above elements automatically
    document.body.addEventListener(
      "touchstart",
      (e) => {
        // If the user touched something interactive...
        if (e.target.closest(targets.join(","))) {
          this.light();
        }
      },
      { passive: true }
    );

    console.log("Kynar Haptics: V2.0 Online");
  }
};

// Global Exposure
window.Haptics = KynarHaptics; // Legacy support
window.KynarHaptics = KynarHaptics;

// Start Sequence
document.addEventListener("DOMContentLoaded", () => KynarHaptics.init());
