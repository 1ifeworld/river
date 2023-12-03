export function getExpiration() {
  return BigInt(Math.floor(Date.now() / 1000) + 600)
}
