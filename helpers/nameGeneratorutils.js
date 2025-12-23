export function generateBusinessName(prefix = 'AutoMerchant') {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}`;
}
