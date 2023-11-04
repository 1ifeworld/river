import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'

// console.log('Private Key:', process.env.YOUR_PRIVATE_KEY)

// export const operator = privateKeyToAccount(
//   process.env.YOUR_PRIVATE_KEY as Hash,
// )

// console.log('Operator:', operator)

export const operator = privateKeyToAccount(
  '0x5b11374e776da448d75bf65030d7cece94dfa419896cab14bdc0fa813dbd06a7',
  // process.env.NEXT_PUBLIC_PRIVATE_KEY as Hash,
)
