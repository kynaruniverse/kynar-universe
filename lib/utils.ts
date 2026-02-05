import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-safe class merger
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Centralized GBP Formatter
 * Adjusted to 2 decimal places to match your store's pricing.
 */
export const formatGBP = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * iOS-Safe Haptics
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
    // Silent fail
  }
};

/**
 * Utility to lock scroll when Modals/Overlays are open
 */
export const lockScroll = (lock: boolean) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = lock ? 'hidden' : 'unset';
};
