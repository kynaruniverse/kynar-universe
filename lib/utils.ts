import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard Tailwind merger for Kynar components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * KYNAR MOTION: Calm Transition Constants
 * Aligned with UX Canon Section 3 (Earthy-Cosmic)
 */
export const transitions = {
  // Use for page loads or appearing elements
  fadeIn: "animate-in fade-in duration-1000 ease-out",
  
  // Use for buttons and interactive hover states
  calm: "transition-all duration-300 ease-in-out",
  
  // Use for modals or overlays
  groundedSlide: "animate-in slide-in-from-bottom-4 duration-700",
  
  // Use for "Harmonizing" (loading) states
  breathe: "animate-pulse opacity-70",
};

/**
 * Standardizes the "Success" state across the app.
 */
export const groundedFeedback = (type: 'success' | 'error' | 'info') => {
  const base = "px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest";
  switch (type) {
    case 'success': return `${base} bg-kynar-green-500/10 text-kynar-green-700 border border-kynar-green-500/20`;
    case 'error': return `${base} bg-red-50 text-red-700 border border-red-100`;
    default: return `${base} bg-surface text-text-secondary border border-border`;
  }
};
