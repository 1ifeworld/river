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
  pathsToRevalidate?: string[]
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}): Promise<boolean> {
  // Declare constants/params
  const msgTimestamp: bigint = getExpiration() // gives 120s buffer
  const msgType = 3
  const msgBody = await encodeCreateChannelMsgBody({
    name: name,
    description: description,
    admins: [rid],
    members: [],
  })
  if (!msgBody?.msgBody) return false
  // generate hash to include in post
  const messageHash = generateMessageHash({
    rid: rid,
    timestamp: msgTimestamp,
    msgType: msgType,
    msgBody: msgBody.msgBody,
  })
  const msgHashForSig = remove0xPrefix({ bytes32Hash: messageHash })
  const sig = (await privySignMessage(msgHashForSig)) as Hash

  const post = {
    signer: signer,
    message: {
      rid: rid,
      timestamp: msgTimestamp,
      msgType: msgType,
      msgBody: msgBody.msgBody,
    },
    hashType: 1,
    hash: messageHash,
    sigType: 1,
    sig: sig,
  }

  try {
    const relayResponse = await relayPost(post)

    if (relayResponse.success) {
      const transactionHash = relayResponse.hash

      const txnInclusion = await getTxnInclusion(transactionHash)

      if (txnInclusion) {
        revalidationHelper('/')
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
