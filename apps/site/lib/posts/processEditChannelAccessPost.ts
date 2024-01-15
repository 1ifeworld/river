import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash } from 'viem'
import { relayPost } from '@/lib'
import {
  encodeEditChannelAccess,
  encodeMessage,
  encodePost,
  generateHashForPostSig,
  getExpiration,
  messageTypes,
  postTypes,
  remove0xPrefix,
} from 'scrypt'

export async function processEditChannelAccessPost({
  targetUserId,
  targetChannelId,
  admins,
  members,
  privySignMessage,
}: {
  targetUserId: bigint
  targetChannelId: bigint
  admins: bigint[]
  members: bigint[]
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}): Promise<boolean> {
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration: bigint = getExpiration()
  // generate encoded msgBody for editChannelAccessMsg
  const createEditChannelAccessMsg = encodeEditChannelAccess({
    channelTarget: targetChannelId,
    admins: admins,
    members: members,
  })
  // add this in to prevent msgBody from being null
  if (!createEditChannelAccessMsg) return false
  console.log('encoded editChannelAccess msgBody correctly')
  const encodedMessage = encodeMessage({
    msgType: Number(messageTypes.editChannelAccess),
    msgBody: createEditChannelAccessMsg.msgBody,
  })
  // add this in to prevent full encoded message from being null
  if (!encodedMessage) return false
  console.log('encoded full editChannelAccess correctly')
  // generate the bytes[] messageArray
  const messageArray: Hash[] = [encodedMessage?.encodedMessage]
  // generate post hash
  const postHash = generateHashForPostSig({
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
  })
  const postHashForSig = remove0xPrefix({ bytes32Hash: postHash })
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const sig = (await privySignMessage(postHashForSig)) as Hash
  // Encode data to post through Gateway
  const postInput = encodePost({
    userId: targetUserId,
    hashType: postTypes.hashScheme1,
    hash: postHash,
    sigType: postTypes.sigTypeECDSA,
    sig: sig,
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
  })
  // add this in to prevent postInputs being null
  if (!postInput) return false
  console.log('postInput encoded correctly', postInput)
  // pass postInputs into the createPost server action
  const relaySuccess = await relayPost({
    postInput: postInput,
    pathsToRevalidate: [`/channel/${targetChannelId}`, '/'],
  })
  // return relay success boolean
  return relaySuccess
}
