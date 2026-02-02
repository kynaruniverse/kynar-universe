/**
 * KYNAR UNIVERSE: Laws of Physics (v1.6)
 * Role: Structural utilities, motion constants, and interaction logic.
 * Optimization: Next.js 15 + Mobile Haptics + Hydration Safety.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard Tailwind Merger
 * Optimizes class merging to prevent CSS specificity conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * KYNAR MOTION: The Calm Scale
 * Hardware-accelerated transitions aligned with Design System Section 11.
 */
export const transitions = {
  // Noble Entrance: Used for page loads and large containers
  entrance: "animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-kyn-out",
  
  // Tactical Interaction: Used for buttons and cards
  interactive: "transition-all duration-300 ease-out active:scale-[0.97]",
  
  // High-Precision: Used for icons and small toggles
  micro: "transition-transform duration-200 ease-spring",
  
  // Harmonizing: The standard pulse for loading states
  breathe: "animate-pulse opacity-70 italic",
};

/**
 * HYDRATION-SAFE FORMATTERS
 * Prevents "text content mismatch" by forcing consistent locales.
 */
export const formatGBP = (amount: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * TACTILE FEEDBACK (Mobile-First)
 * Provides physical reassurance for critical actions.
 * Safe for SPCK and all modern mobile browsers.
 */
export const hapticFeedback = (intensity: "light" | "medium" | "success" = "light") => {
  if (typeof window !== "undefined" && navigator.vibrate) {
    switch (intensity) {
      case "light": return navigator.vibrate(10);
      case "medium": return navigator.vibrate(20);
      case "success": return navigator.vibrate([10, 30, 10]);
      default: return;
    }
  }
};

/**
 * THE GROUNDED STATE (UX Canon Section 1)
 * Generates semantic styling for feedback components.
 */
export const getGroundedStatus = (type: 'success' | 'error' | 'info' | 'caution') => {
  const base = "px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] border calm-transition";
  
  const variants = {
    success: "bg-kyn-green-50/50 text-kyn-green-700 border-kyn-green-100",
    error: "bg-kyn-caramel-50 text-kyn-caramel-700 border-kyn-caramel-100",
    info: "bg-kyn-slate-50 text-kyn-slate-700 border-kyn-slate-100",
    caution: "bg-yellow-50 text-yellow-700 border-yellow-100",
  };

  return cn(base, variants[type]);
};

/**
 * TIME INDEXER
 * Formats dates into the Kynar 'Briefing' style.
 */
export const formatBriefingDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).toUpperCase();
};
