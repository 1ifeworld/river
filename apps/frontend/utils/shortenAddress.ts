import { getAddress, Hex } from 'viem';

export function shortenAddress(address?: Hex, chars = 4): string {
  if (!address) {
    return '';
  }

  const parsed = getAddress(address);

  if (!parsed) {
    console.error(`Invalid 'address' parameter '${address}'.`);
    return '';
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
