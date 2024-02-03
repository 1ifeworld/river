export function getExpiration() {
  return BigInt(Math.floor(Date.now() / 1000) + 120) // 2 min buffer
}
