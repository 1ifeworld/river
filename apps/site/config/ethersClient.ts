import 'server-only'

import { NonceManager, ethers } from 'ethers'

const provider = new ethers.AlchemyProvider(420, `${process.env.ALCHEMY_KEY}`)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)

export const nonceManager = new NonceManager(signer)
