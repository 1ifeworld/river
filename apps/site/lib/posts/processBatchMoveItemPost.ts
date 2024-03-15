import { getTxnInclusion, relayPostBatch, revalidationHelper } from '@/lib'
import type { SignMessageModalUIOptions } from '@privy-io/react-auth'
import {
  type Post,
  encodeAddItemMsgBody,
  encodeRemoveItemMsgBody,
  generateMessageHash,
  getExpiration,
  remove0xPrefix,
} from 'scrypt'
import { type Hash, type Hex, encodeAbiParameters } from 'viem'

type Diff = {
    channelId: string
    action: number
}

export async function processBatchMoveItemPost({
  signer,
  rid,
  itemId,
  diffs,
  privySignMessage,
}: {
  signer: Hex
  rid: bigint
  itemId: string
  diffs: Diff[]
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}): Promise<boolean> {
  // generic values
  const timestamp = getExpiration()
  // initialize empty Post array
  let posts: Post[] = []
  //
  for (let i = 0; i < diffs.length; ++i) {
    if (diffs[i].action == 1) {
        // add item to channel
        const addItemMsgType: number = 5
        const addItemMsgBody = encodeAddItemMsgBody({
          itemCid: itemId,
          channelCid: diffs[i].channelId,
        })
        if (!addItemMsgBody?.msgBody) return false
        const addItemMessageHash = generateMessageHash({
          rid: BigInt(rid),
          timestamp: BigInt(timestamp),
          msgType: addItemMsgType as number,
          msgBody: addItemMsgBody.msgBody,
        })
        const addItemMsgHashForSig = remove0xPrefix({
          bytes32Hash: addItemMessageHash,
        })
        const addItemSig = (await privySignMessage(addItemMsgHashForSig)) as Hash
        posts.push({
            signer: signer,
            message: {
              rid: BigInt(rid),
              timestamp: BigInt(timestamp),
              msgType: addItemMsgType as number,
              msgBody: addItemMsgBody.msgBody,
            },
            hashType: 1 as number,
            hash: addItemMessageHash,
            sigType: 1 as number,
            sig: addItemSig,
        })
    } else {
        // remove item from channel
        const msgType = 6 as number
        const msgBody = encodeRemoveItemMsgBody({
          itemCid: itemId,
          channelCid: diffs[i].channelId,
        })
        if (!msgBody?.msgBody) return false
        // generate hash to include in post
        const messageHash = generateMessageHash({
          rid: BigInt(rid),
          timestamp: BigInt(timestamp),
          msgType: msgType as number,
          msgBody: msgBody.msgBody,
        })
        const msgHashForSig = remove0xPrefix({ bytes32Hash: messageHash })
        const sig = (await privySignMessage(msgHashForSig)) as Hash
      
        posts.push({
          signer: signer,
          message: {
            rid: BigInt(rid),
            timestamp: BigInt(timestamp),
            msgType: msgType as number,
            msgBody: msgBody.msgBody,
          },
          hashType: 1 as number,
          hash: messageHash,
          sigType: 1 as number,
          sig: sig,
        })       
    }
  }

  try {
    const postBatchResponse = await relayPostBatch(posts)

    if (postBatchResponse.success) {
      const transactionHash = postBatchResponse.hash

      const txnInclusion = await getTxnInclusion(transactionHash)

      if (txnInclusion) {
        revalidationHelper('/', 'layout')
        return true
      } else {
        console.error('Transaction was not successfully included.')
        return false
      }
    } else {
      console.error('Relay post batch was unsuccessful.')
      return false
    }
  } catch (error) {
    console.error('Error relaying post batch:', error)
    return false
  }
}
