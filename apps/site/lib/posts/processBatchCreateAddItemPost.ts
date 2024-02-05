import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash, Hex, encodeAbiParameters } from 'viem'
import {  getTxnInclusion, relayPostBatch } from '@/lib'
import {
  getExpiration,
  remove0xPrefix,
  generateMessageHash,
  encodeCreateAssetMsgBody,
  encodeAddItemMsgBody,
  createIpfsHashFromAnything,
} from 'scrypt'
import { revalidatePath } from 'next/cache'

type Message = {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: Hash
}

type Post = {
  signer: Hex
  message: Message
  hashType: number
  hash: Hash
  sigType: number
  sig: Hash
}

// NOTE: this is here to help with serialization of message object -> stringified json, and properly handle bigints
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

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
  const createItemMsgType: number = 1
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
  const itemCid = await createIpfsHashFromAnything(
    JSON.stringify(createItemPost.message),
  )
  console.log('site site item cid: ', itemCid)

  /*
  ADD ITEM POST
  */
  const addItemMsgType: number = 5
  const addItemMsgBody = encodeAddItemMsgBody({
    itemCid: itemCid,
    channelCid: channelId,
  })
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
    const postBatchResponse = await relayPostBatch([createItemPost, addItemPost])
  
    if (postBatchResponse.success) {
      const transactionHash = postBatchResponse.hash
      console.log("Transaction Hash:", transactionHash)
  
      const txnInclusion = await getTxnInclusion(transactionHash)
  
      if (txnInclusion) {
        pathsToRevalidate.forEach((path) => revalidatePath(path))
        return true 
        
      } else {
        console.error("Transaction was not included successfully.")
        return false 
      }
    } else {
      console.error("Relay Post Batch was not successful.")
      return false 
    }
  } catch (error) {
    console.error("Error relaying post batch:", error)
    return false 
  } 
}