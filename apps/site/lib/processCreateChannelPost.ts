import { relayPost } from '@/actions'
import {
  encodePost,
  encodeMessage,
  // encodeUriAndAccess,
  encodeCreateChannel,
  postTypes,
  messageTypes,
  getExpiration,
  generateHashForPostSig,
} from 'scrypt'
import { Hash } from 'viem'

import { SignMessageModalUIOptions } from '@privy-io/react-auth'

export async function processCreateChannelPost({
  channelUri,
  targetUserId,
  privySignMessage,
}: {
  channelUri: string
  targetUserId: bigint
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}) {
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration: bigint = getExpiration()
  // generate encoded msgBody for createChannelMsg
  const createChannelMsg = encodeCreateChannel({
    uri: channelUri,
    adminIds: [targetUserId],
    memberIds: [],
    channelTags: []
  })
  // add this in to prevent msgBody from being null
  if (!createChannelMsg) return
  console.log('encoded msgBody correctly')
  // generate encodedMessage by packing msgType + msgBody together
  const encodedMessage = encodeMessage({
    msgType: Number(messageTypes.createChannel),
    msgBody: createChannelMsg.msgBody,
  })
  // add this in to prevent encodedMessage being null
  if (!encodedMessage) return
  console.log('encoded message correctly')
  // generate the bytes[] messageArray
  const messageArray: Hash[] = [encodedMessage?.encodedMessage]
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
    hashType: postTypes.hashScheme1,
    hash: hashToSign,
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
  await relayPost({ postInput: postInput, pathToRevalidate: '/' })
}
