export function absBigInt(bigintValue: bigint) {
  return bigintValue < 0 ? bigintValue * BigInt(-1) : bigintValue;
}
