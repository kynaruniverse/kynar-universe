/**
 * KYNAR UNIVERSE: Haptics & Scroll Utilities (v1.1)
 * Role: Lightweight, iOS-safe feedback and overlay helpers.
 */

/**
 * Trigger iOS-safe haptic feedback using the Vibration API.
 * Falls back silently if unsupported.
 */
export const hapticFeedback = (
  intensity: "light" | "medium" | "success" = "light"
): void => {
  if (typeof navigator?.vibrate !== "function") return;
  
  const patterns: Record < typeof intensity, number | number[] > = {
    light: 10,
    medium: 20,
    success: [10, 30, 10],
  };
  
  try {
    navigator.vibrate(patterns[intensity]);
  } catch {
    // Fail silently on unexpected errors
  }
};

/**
 * Locks or unlocks page scroll, safe for SSR.
 * Useful for modals, overlays, or drawer components.
 */
export const lockScroll = (lock: boolean): void => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = lock ? "hidden" : "";
};