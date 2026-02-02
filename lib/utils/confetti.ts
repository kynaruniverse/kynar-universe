/**
 * KYNAR UNIVERSE: Grounded Celebration (v1.6)
 * Role: Haptic-visual affirmation utility.
 * Optimization: Next.js 15 Dynamic Loading + Reduced Motion Safety.
 */

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  ticks?: number;
}

/**
 * Triggers a calibrated celebration.
 * Optimized for mobile-first performance via dynamic browser-only imports.
 */
export const triggerCelebration = async (options?: ConfettiOptions) => {
  // 1. Guard: Ensure we are in a browser environment
  if (typeof window === "undefined") return;

  // 2. Dynamic Import: Keep the initial bundle lean for mobile devices
  // This prevents 'canvas-confetti' from being included in the SSR payload
  const { default: confetti } = await import("canvas-confetti");

  // 3. Kynar Brand Palette (Earthy-Cosmic Section 3)
  const KYNAR_PALETTE = [
    "#166534", // Kyn-Green-700
    "#C9A07D", // Kyn-Caramel-500
    "#0F172A", // Kyn-Slate-900
    "#F1F5F9", // Kyn-Slate-100
  ];

  // 4. Execution with Accessibility & Mobile optimization
  return confetti({
    particleCount: options?.particleCount ?? 40,
    spread: options?.spread ?? 70,
    origin: options?.origin ?? { y: 0.7 }, // Centered for mobile thumb reach
    colors: options?.colors ?? KYNAR_PALETTE,
    ticks: options?.ticks ?? 200, // Duration of the celebration
    zIndex: 100,
    disableForReducedMotion: true, // UX Canon: Respect system preferences
    gravity: 1.2, // Faster, grounded descent
    scalar: 0.8, // Slightly smaller particles for mobile screens
  });
};
