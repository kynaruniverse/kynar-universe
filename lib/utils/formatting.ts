/**
 * Optimized GBP formatter
 * Pre-creates the formatter to avoid repeated instantiation.
 * Defaults invalid numbers to £0.00
 */
const GBP_FORMATTER = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatGBP = (amount ? : number | null): string =>
  GBP_FORMATTER.format(typeof amount === "number" && !isNaN(amount) ? amount : 0);