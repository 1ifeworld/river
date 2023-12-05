import { relayPost } from '@/actions'
import {
  encodePost,
  encodeMessage,
  encodePub,
  encodeAddPubItemBody,
  encodeItem,
  postTypes,
  messageTypes,
  getExpiration,
  generateHashForPostSig,
  TargetType,
} from 'scrypt'
import { Hash } from 'viem'

import { SignMessageModalUIOptions } from '@privy-io/react-auth'

export async function processCreatePubAndAddItemPost({
  pubUri,
  targetChannelId,
  targetUserId,
  privySignMessage,
}: {
  pubUri: string
  targetChannelId: bigint
  targetUserId: bigint
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}) {
  console.log('wooo were running inside the big helper thing')
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration: bigint = getExpiration()
  // generate encoded msgBody for createChannelMsg

  /*  createPublication */
  const createPubMsgBody = encodePub({
    uri: pubUri,
  })

  /*  addPubItem */
  const addPubItemBody = encodeAddPubItemBody({
    targetChannelId: targetChannelId,
    targetPubId: BigInt(-10), // -10 refers to, target pubId of first created pubId in post
  })
  if (!addPubItemBody) return
  console.log('addPubItemBody encoded successffuly')
  const addPubItemMsgBody = encodeItem({
    itemType: TargetType.PUB,
    itemBody: addPubItemBody.itemBody,
  })
  // add this in to prevent msgBody from being null
  if (!createPubMsgBody || !addPubItemMsgBody) return
  console.log('encoded pub and addPubItem msgBody correctly')

  const encodedPubMsg = encodeMessage({
    msgType: messageTypes.createPublication,
    msgBody: createPubMsgBody.msgBody,
  })

  const encodedAddPubItemMsg = encodeMessage({
    msgType: messageTypes.addItem,
    msgBody: addPubItemMsgBody.msgBody,
  })

  // add this in to prevent either encoded messages from being null
  if (!encodedPubMsg || !encodedAddPubItemMsg) return
  console.log('encoded pub and addPubItem messages correctly')
  // generate the bytes[] messageArray
  const messageArray: Hash[] = [
    encodedPubMsg?.encodedMessage,
    encodedAddPubItemMsg.encodedMessage,
  ]
  // NOTE: this encoding step should be a scrypt export as well
  // bytes32 messageToBeSigned = keccak256(abi.encode(version, expiration, msgArray)).toEthSignedMessageHash();
  const hashToSign = generateHashForPostSig({
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
  })
  console.log('hashToSign signed hash genereated correctly')
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const sig = await privySignMessage(hashToSign)
  console.log('sig generated correctly')
  // Generate encodedPost bytes data -- this is the input to the `post` function`
  const postInput = encodePost({
    userId: targetUserId,
    sigType: postTypes.sigTypeECDSA,
    sig: sig as Hash,
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
  })
  // add this in to prevent postInputs being null
  if (!postInput) return
  console.log('postInput encoded correctly')
  // pass postInputs into the createPost server action
  await relayPost({
    postInput: postInput,
    pathToRevalidate: `/channel/${targetChannelId}`,
  })
}
