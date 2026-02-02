import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-safe class merger
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Canonical animation tokens
 * (Centralized to avoid hydration drift)
 */
export const transitions = {
  breathe: "animate-pulse",
} as const;

/**
 * Centralized GBP Formatter
 * Ensures the Server and Client always produce identical strings.
 */
export const formatGBP = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * iOS-Safe Haptics
 * Always returns void to satisfy TS exhaustiveness
 */
export const hapticFeedback = (
  intensity: "light" | "medium" | "success" = "light"
): void => {
  if (
    typeof window === "undefined" ||
    typeof navigator === "undefined" ||
    !navigator.vibrate
  ) {
    return;
  }

  try {
    switch (intensity) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(20);
        break;
      case "success":
        navigator.vibrate([10, 30, 10]);
        break;
    }
  } catch {
    // Silent fail for unsupported platforms (iOS)
  }
};