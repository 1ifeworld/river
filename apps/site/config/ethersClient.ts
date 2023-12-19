import 'server-only'

import { NonceManager, ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)

const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)

export const nonceManager = new NonceManager(signer)