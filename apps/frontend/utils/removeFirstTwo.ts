import { type Hex } from 'viem';

export function removeFirstTwo(str: string | Hex) {
  if (str.length <= 2) {
    return '';
  }

  return str.substring(2);
}
