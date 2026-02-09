import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-safe class name utility.
 * Combines multiple class values and merges Tailwind conflicts.
 * 
 * @param inputs - Any number of class values (strings, objects, arrays)
 * @returns A single, merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}