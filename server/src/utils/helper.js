export function getDiscountPercentage(originalPrice, discountedPrice) {
  if (originalPrice <= 0) return 0; 
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount); 
}