import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash, Hex } from 'viem'
import { relayPost } from '@/lib'
import { getTxnInclusion, revalidationHelper } from '@/lib'
import {
  getExpiration,
  remove0xPrefix,
  generateMessageHash,
  encodeCreateChannelMsgBody,
} from 'scrypt'
import { revalidatePath } from 'next/cache'

export async function processCreateChannelPost({
  signer,
  name,
  description,
  rid,
  privySignMessage,
}: {
  signer: Hex
  name: string
  description: string
  rid: bigint
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}): Promise<boolean> {
  // Declare constants/params
  const msgTimestamp: bigint = getExpiration() // gives 120s buffer
  const msgType = 3 as number
  const msgBody = await encodeCreateChannelMsgBody({
    name: name,
    description: description,
    admins: [BigInt(rid)],
    members: [],
  })
  if (!msgBody?.msgBody) return false
  // generate hash to include in post
  const messageHash = generateMessageHash({
    rid: BigInt(rid),
    timestamp: BigInt(msgTimestamp),
    msgType: msgType as number,
    msgBody: msgBody.msgBody,
  })
  const msgHashForSig = remove0xPrefix({ bytes32Hash: messageHash })
  const sig = (await privySignMessage(msgHashForSig)) as Hash

  const post = {
    signer: signer,
    message: {
      rid: BigInt(rid),
      timestamp: BigInt(msgTimestamp),
      msgType: msgType as number,
      msgBody: msgBody.msgBody,
    },
    hashType: 1 as number,
    hash: messageHash,
    sigType: 1 as number,
    sig: sig,
  }

  try {
    const relayResponse = await relayPost(post)

    if (relayResponse.success) {
      const transactionHash = relayResponse.hash

      const txnInclusion = await getTxnInclusion(transactionHash)

      if (txnInclusion) {
        revalidatePath('/', 'layout')
        return true
      } else {
        console.error('Transaction was not successfully included.')
        return false
      }
    } else {
      console.error('Relay post was unsuccessful.')
      return false
    }
  } catch (error) {
    console.error('Error relaying post:', error)
    return false
  }
}
