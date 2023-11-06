import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'

export const operator = privateKeyToAccount(
  '0x5b11374e776da448d75bf65030d7cece94dfa419896cab14bdc0fa813dbd06a7',
  // process.env._PRIVATE_KEY as Hash
)
