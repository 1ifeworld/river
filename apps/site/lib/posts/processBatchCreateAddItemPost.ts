import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash, Hex, encodeAbiParameters } from 'viem'
import { getTxnInclusion, relayPostBatch, revalidationHelper } from '@/lib'
import { messageToCid } from '@/utils'
import {
  getExpiration,
  remove0xPrefix,
  generateMessageHash,
  encodeCreateAssetMsgBody,
  encodeAddItemMsgBody,
  type Message,
  type Post
} from 'scrypt'

export async function processBatchCreateAddItemPost({
  signer,
  rid,
  itemUri,
  channelId,
  pathsToRevalidate,
  privySignMessage,
}: {
  signer: Hex
  rid: bigint
  itemUri: string
  channelId: string
  pathsToRevalidate: string[]
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}): Promise<boolean> {
  // generic values
  const timestamp = getExpiration()
  /*
        CREATE ITEM POST
    */
  const createItemMsgType = 1
  const createItemMsgBody = encodeCreateAssetMsgBody({
    data: {
      dataType: 1,
      contents: encodeAbiParameters(
        [{ name: 'itemUri', type: 'string' }],
        [itemUri],
      ),
    },
    access: {
      accessType: 1,
      contents: encodeAbiParameters(
        [{ name: 'admins', type: 'uint256[]' }],
        [[rid]],
      ),
    },
  })
  if (!createItemMsgBody?.msgBody) return false
  // generate hash to include in post
  const createItemMessageHash = generateMessageHash({
    rid: rid,
    timestamp: timestamp,
    msgType: createItemMsgType,
    msgBody: createItemMsgBody.msgBody,
  })
  const createItemMsgHashForSig = remove0xPrefix({
    bytes32Hash: createItemMessageHash,
  })
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const createItemSig = (await privySignMessage(
    createItemMsgHashForSig,
  )) as Hash
  const createItemPost: Post = {
    signer: signer,
    message: {
      rid: BigInt(rid),
      timestamp: timestamp,
      msgType: createItemMsgType,
      msgBody: createItemMsgBody.msgBody,
    },
    hashType: 1,
    hash: createItemMessageHash,
    sigType: 1,
    sig: createItemSig,
  }
  console.log("credate item message in site: ", createItemPost.message)
  const itemCid = (await messageToCid(createItemPost.message)).cid.toString()  
  /*
  ADD ITEM POST
  */
  const addItemMsgType: number = 5
  const addItemMsgBody = encodeAddItemMsgBody({
    itemCid: itemCid,
    channelCid: channelId,
  })
  console.log("item cid: ", itemCid)
  console.log("channel cid: ", channelId)
  if (!addItemMsgBody?.msgBody) return false
  const addItemMessageHash = generateMessageHash({
    rid: rid,
    timestamp: timestamp,
    msgType: addItemMsgType,
    msgBody: addItemMsgBody.msgBody,
  })
  const addItemMsgHashForSig = remove0xPrefix({
    bytes32Hash: addItemMessageHash,
  })
  const addItemSig = (await privySignMessage(addItemMsgHashForSig)) as Hash
  const addItemPost: Post = {
    signer: signer,
    message: {
      rid: rid,
      timestamp: timestamp,
      msgType: addItemMsgType,
      msgBody: addItemMsgBody.msgBody,
    },
    hashType: 1,
    hash: addItemMessageHash,
    sigType: 1,
    sig: addItemSig,
  }

  try {  
  // @ts-ignore
  BigInt.prototype.toJSON = function () {
    return this.toString()
  }          
    const postBatchResponse = await relayPostBatch([
      createItemPost,
      addItemPost,
    ])

    if (postBatchResponse.success) {
      const transactionHash = postBatchResponse.hash

      const txnInclusion = await getTxnInclusion(transactionHash)

      if (txnInclusion) {
        revalidationHelper(pathsToRevalidate)
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
