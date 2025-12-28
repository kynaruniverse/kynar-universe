/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR HAPTIC INTERFACE (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Tactile feedback engine for the Kynar Marketplace. 
 * Translates digital actions into physical sensations for a premium feel.
 */

const KynarHaptics = {
  // 1. CONFIGURATION
  enabled: true,
  lastFired: 0,
  cooldown: 100, // Milliseconds to prevent "buzzing" overload

  // 2. TACTILE PATTERNS
  light: () => {
    KynarHaptics.trigger(8);
  },

  medium: () => {
    KynarHaptics.trigger(15);
  },

  heavy: () => {
    // Pattern: Short, Gap, Long (Error/Impact)
    KynarHaptics.trigger([10, 50, 35]);
  },

  success: () => {
    // Pattern: Light, Gap, Medium (Confirmation)
    KynarHaptics.trigger([10, 30, 20]);
  },

  // 3. CORE TRIGGER ENGINE
  trigger(pattern) {
    const now = Date.now();
    if (!this.enabled || !navigator.vibrate) return;
    
    // Check cooldown for sensory clarity
    if (now - this.lastFired < this.cooldown) return;

    navigator.vibrate(pattern);
    this.lastFired = now;
  },

  // 4. AUTO-BINDER ENGINE
  init() {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isMobile) return;

    // Marketplace Interaction Targets
    const targets = [
      ".dock-btn",        // Main CTAs
      ".nav-item",        // Drawer Links
      ".stream-card",     // Product Interaction
      "#cart-trigger",    // Updated Cart Selector
      "#nav-toggle",      // Menu Selector
      ".auth-tab",        // Modal Toggles
      "#close-drawer"     // Close Buttons
    ];

    document.body.addEventListener(
      "touchstart",
      (e) => {
        if (e.target.closest(targets.join(","))) {
          this.light();
        }
      },
      { passive: true }
    );

    console.log("Kynar Haptics: Optimized Interface Active");
  }
};

// Global Exposure
window.Haptics = KynarHaptics;

// Start Sequence
document.addEventListener("DOMContentLoaded", () => KynarHaptics.init());
