import 'server-only'

import { NonceManager, ethers } from 'ethers'

// const provider = new ethers.AlchemyProvider(420, `${process.env.ALCHEMY_KEY}`)
const provider = new ethers.AlchemyProvider(420, `xcylx3KmcrG0QmybT2dVGVxU9NjOWQ4n`)
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
const signer = new ethers.Wallet("0x5b11374e776da448d75bf65030d7cece94dfa419896cab14bdc0fa813dbd06a7" as string, provider)

export const nonceManager = new NonceManager(signer)
