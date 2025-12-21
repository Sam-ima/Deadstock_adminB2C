export function calculateDepreciatedPrice(basePrice, rate, createdAt) {
  const months =
    (Date.now() - new Date(createdAt)) /
    (1000 * 60 * 60 * 24 * 30);

  const depreciation = (basePrice * rate * months) / 100;
  return Math.max(basePrice - depreciation, 0);
}
