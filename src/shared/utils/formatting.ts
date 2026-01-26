import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn
 * The ultimate utility for merging Tailwind classes without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * formatDate
 * Standardised date formatting for the Kynar interface.
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaults: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  
  return new Date(date).toLocaleDateString(undefined, { ...defaults, ...options })
}

/**
 * formatCurrency
 * Set to GBP by default to match your store's primary currency.
 */
export function formatCurrency(amount: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount)
}
