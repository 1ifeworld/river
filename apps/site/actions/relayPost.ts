'use server'

import { addresses, postGatewayABI } from 'scrypt'
import { nonceManager } from '@/config/ethersClient'
import { Hash, encodeFunctionData } from 'viem'
import { revalidatePath } from 'next/cache'

interface RelayPostProps {
  postInput: Hash
  pathToRevalidate: string
}

export async function relayPost({
  postInput,
  pathToRevalidate,
}: RelayPostProps) {
  const encodePostCall = encodeFunctionData({
    abi: postGatewayABI,
    functionName: 'post',
    args: [postInput],
  })

  try {
    const postTxn = await nonceManager.sendTransaction({
      to: addresses.postGateway.opGoerli,
      data: encodePostCall,
    })
    const postTxnReceipt = await postTxn.wait()

    revalidatePath(pathToRevalidate)

    console.log('Post transaction receipt: ', postTxnReceipt)
  } catch (error) {
    console.error('Post transaction failed: ', error)
  }
}
