import { relayPost } from '@/lib'
import { getTxnInclusion } from '@/lib'
import type { SignMessageModalUIOptions } from '@privy-io/react-auth'
import {
  MessageTypes,
  encodeUpdateAssetRoleAccessMsgBody,
  generateMessageHash,
  getExpiration,
  remove0xPrefix,
} from 'scrypt'
import type { Hash, Hex } from 'viem'
import { revalidatePath } from 'next/cache'

export async function processEditRolesPost({
  rid,
  signer,
  privySignMessage,
  channelCid,
  targetRids,
  roles,
}: {
  signer: Hex
  rid: bigint
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
  channelCid: string
  targetRids: bigint[]
  roles: bigint[]
}): Promise<boolean> {
  // Declare constants/params
  const msgTimestamp: bigint = getExpiration() // gives 120s buffer
  const msgType = MessageTypes.UPDATE_CHANNEL as number
  const msgBody = encodeUpdateAssetRoleAccessMsgBody({
    assetCid: channelCid,
    targetRids,
    roles: roles,
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
