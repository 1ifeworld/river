import { privateKeyToAccount } from 'viem/accounts'
import { type Hash } from 'viem'

export const operator = privateKeyToAccount(process.env.PRIVATE_KEY as Hash)
