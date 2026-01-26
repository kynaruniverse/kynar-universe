export function formatDate(date: string | Date, options ? : Intl.DateTimeFormatOptions): string {
  const defaults: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  return new Date(date).toLocaleDateString(undefined, { ...defaults, ...options });
}

export function formatCurrency(amount: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount);
}