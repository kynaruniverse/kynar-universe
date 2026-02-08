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