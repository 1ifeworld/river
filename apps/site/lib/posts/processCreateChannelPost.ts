import { relayPost } from '@/lib'
import { getTxnInclusion, revalidationHelper } from '@/lib'
import type { SignMessageModalUIOptions } from '@privy-io/react-auth'
import {
  encodeCreateChannelMsgBody,
  generateMessageHash,
  getExpiration,
  remove0xPrefix,
} from 'scrypt'
import type { Hash, Hex } from 'viem'
import { messageToCid } from '@/utils'

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
}): Promise<{ success: boolean; channelId: string | null }> {
  // Declare constants/params
  const msgTimestamp: bigint = getExpiration() // gives 120s buffer
  const msgType = 3 as number
  const msgBody = await encodeCreateChannelMsgBody({
    name: name,
    description: description,
    members: [BigInt(rid)],
    roles: [BigInt(2)],
  })
  if (!msgBody?.msgBody) return { success: false, channelId: null }
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

  // generate channelCid to return to client for redirect
  const channelCid = (await messageToCid(post.message)).cid.toString()  

  try {
    const relayResponse = await relayPost(post)

    if (relayResponse.success) {
      const transactionHash = relayResponse.hash

      const txnInclusion = await getTxnInclusion(transactionHash)

      if (txnInclusion) {
        revalidationHelper('/', 'layout')
        return { success: true, channelId: channelCid }
      } else {
        console.error('Transaction was not successfully included.')
        return { success: false, channelId: null }
      }
    } else {
      console.error('Relay post was unsuccessful.')
      return { success: false, channelId: null }
    }
  } catch (error) {
    console.error('Error relaying post:', error)
    return { success: false, channelId: null }
  }
}
