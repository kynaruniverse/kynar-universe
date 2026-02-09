/**
 * KYNAR UNIVERSE: Grounded Celebration (v1.6)
 * Role: Haptic-visual affirmation utility.
 * Optimization: Next.js 15 Dynamic Loading + Reduced Motion Safety.
 */

interface ConfettiOptions {
  particleCount ? : number;
  spread ? : number;
  origin ? : { x ? : number;y ? : number };
  colors ? : string[];
  ticks ? : number;
  gravity ? : number;
  scalar ? : number;
  zIndex ? : number;
}

/**
 * Triggers a calibrated celebration with Kynar-branded colors.
 * Browser-only; dynamically imports `canvas-confetti` for performance.
 */
export const triggerCelebration = async (
  options: ConfettiOptions = {}
): Promise < void > => {
  if (typeof window === "undefined") return; // Guard for server
  
  const { default: confetti } = await import("canvas-confetti");
  
  const KYNAR_PALETTE = [
    "#166534", // Kyn-Green-700
    "#C9A07D", // Kyn-Caramel-500
    "#0F172A", // Kyn-Slate-900
    "#F1F5F9", // Kyn-Slate-100
  ];
  
  confetti({
    particleCount: options.particleCount ?? 40,
    spread: options.spread ?? 70,
    origin: options.origin ?? { y: 0.7 },
    colors: options.colors ?? KYNAR_PALETTE,
    ticks: options.ticks ?? 200,
    gravity: options.gravity ?? 1.2,
    scalar: options.scalar ?? 0.8,
    zIndex: options.zIndex ?? 100,
    disableForReducedMotion: true,
  });
};