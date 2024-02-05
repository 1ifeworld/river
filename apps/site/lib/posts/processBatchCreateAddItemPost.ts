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
  type Post
} from 'scrypt'

export async function processBatchCreateAddItemPost({
  signer,
  rid,
  itemUri,
  channelId,
  privySignMessage,
}: {
  signer: Hex
  rid: bigint
  itemUri: string
  channelId: string
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
        [
          { name: 'members', type: 'uint256[]' },
          { name: 'roles', type: 'uint256[]' },
        ],
        // Hardcoding in Roles.ADMIN for item creators
        [[rid], [BigInt(2)]],
      ),
    },
  })
  if (!createItemMsgBody?.msgBody) return false
  // generate hash to include in post
  const createItemMessageHash = generateMessageHash({
    rid: BigInt(rid),
    timestamp: BigInt(timestamp),
    msgType: createItemMsgType as number,
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
      timestamp: BigInt(timestamp),
      msgType: createItemMsgType as number,
      msgBody: createItemMsgBody.msgBody,
    },
    hashType: 1,
    hash: createItemMessageHash,
    sigType: 1,
    sig: createItemSig,
  }
  // Create itemCid using canonical types
  const itemCid = (await messageToCid(createItemPost.message)).cid.toString()  
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
    rid: BigInt(rid),
    timestamp: BigInt(timestamp),
    msgType: addItemMsgType as number,
    msgBody: addItemMsgBody.msgBody,
  })
  const addItemMsgHashForSig = remove0xPrefix({
    bytes32Hash: addItemMessageHash,
  })
  const addItemSig = (await privySignMessage(addItemMsgHashForSig)) as Hash
  const addItemPost: Post = {
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
  }

  try {   
    const postBatchResponse = await relayPostBatch([
      createItemPost,
      addItemPost,
    ])

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
