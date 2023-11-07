import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'

export const operator = privateKeyToAccount(
  process.env.NEXT_PUBLIC_PRIVATE_KEY as Hash,
)
