import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'

export const operator = privateKeyToAccount(process.env._PRIVATE_KEY as Hash)
