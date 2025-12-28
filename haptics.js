/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR HAPTIC INTERFACE (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Provides subtle haptic feedback for mobile interactions.
 * Uses the Web Vibration API to enhance the "Premium App" feel.
 */

const Haptics = {
  // #region [ 1. SETTINGS ]

  enabled: true,

  // #endregion

  // #region [ 2. FEEDBACK PATTERNS ]

  /**
   * LIGHT TICK
   * Use: Scroll snaps, light hover.
   */
  light: () => {
    if (Haptics.enabled && navigator.vibrate) navigator.vibrate(5);
  },

  /**
   * MEDIUM TAP
   * Use: Standard button clicks and menu toggles.
   */
  medium: () => {
    if (Haptics.enabled && navigator.vibrate) navigator.vibrate(12);
  },

  /**
   * HEAVY IMPACT
   * Use: Errors, warnings, or deletions.
   */
  heavy: () => {
    if (Haptics.enabled && navigator.vibrate) navigator.vibrate(30);
  },

  /**
   * SUCCESS CONFIRMATION
   * Use: Completed purchase, successful sign-in.
   */
  success: () => {
    if (Haptics.enabled && navigator.vibrate) navigator.vibrate([10, 40, 20]);
  },

  // #endregion

  // #region [ 3. AUTO-BINDER ]

  /**
   * Detects mobile capability and binds haptics to UI elements.
   */
  init() {
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isMobile) {
      // Marketplace UI Target Classes
      const interactiveElements = [
        ".dock-btn",         // Main CTA Buttons
        ".stream-card",      // Product Cards
        ".feature-card",     // Hero/Category Cards
        "#satchel-trigger",  // Cart Button
        "#nav-toggle",       // Menu Button
        "button",            // Standard Buttons
        "a"                  // All Links
      ];

      document.body.addEventListener(
        "touchstart",
        (e) => {
          if (e.target.closest(interactiveElements.join(","))) {
            Haptics.light();
          }
        },
        { passive: true }
      );
    }

    console.log("Kynar Haptics: Initialized");
  },

  // #endregion
};

// Start Interface
document.addEventListener("DOMContentLoaded", Haptics.init);

// Global Access
window.Haptics = Haptics;
