import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'

// console.log('Private Key:', process.env.YOUR_PRIVATE_KEY)

// export const operator = privateKeyToAccount(
//   process.env.YOUR_PRIVATE_KEY as Hash,
// )

// console.log('Operator:', operator)

export const operator = privateKeyToAccount(
  process.env.YOUR_PRIVATE_KEY as Hash,
)
