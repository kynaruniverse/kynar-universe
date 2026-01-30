export const filterProducts = (products: any[], filters: { world?: string; format?: string }) => {
  return products.filter((product) => {
    const matchesWorld = !filters.world || filters.world === 'all' || product.world === filters.world;
    const matchesFormat = !filters.format || filters.format === 'all' || product.format_label?.includes(filters.format);
    return matchesWorld && matchesFormat;
  });
};
