import { type Hex } from 'viem'

export function firstSeven(str?: string | Hex) {
  return str?.substring(0, 7)
}
