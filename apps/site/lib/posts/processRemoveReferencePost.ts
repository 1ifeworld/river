import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash } from 'viem'
import { relayPost } from '@/lib'
import {
  encodeMessage,
  encodePost,
  encodeRemoveReference,
  generateHashForPostSig,
  getExpiration,
  messageTypes,
  postTypes,
  remove0xPrefix,
} from 'scrypt'

export interface ProcessRemoveReferencePostProps {
  targetUserId: bigint
  targetChannelId: bigint
  targetReferenceId: bigint
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}

export async function processRemoveReferencePost({
  targetUserId,
  targetChannelId,
  targetReferenceId,
  privySignMessage,
}: ProcessRemoveReferencePostProps): Promise<boolean> {
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration = getExpiration()

  const removeReferenceMsg = encodeRemoveReference({
    channelId: targetChannelId,
    referenceId: targetReferenceId,
  })

  if (!removeReferenceMsg) return false // prevent `msgBody` from being null

  const encodedMsg = encodeMessage({
    msgType: Number(messageTypes.removeReference),
    msgBody: removeReferenceMsg.msgBody,
  })

  if (!encodedMsg) return false // prevent `encodedMsg` from being null

  const messageArray: Hash[] = [encodedMsg?.encodedMessage] // generate the message array

  // generate hash to include in post
  const postHash = generateHashForPostSig({
    version: postVersion,
    expiration: postExpiration,
    messageArray: [encodedMsg?.encodedMessage],
  })
  const postHashForSig = remove0xPrefix({ bytes32Hash: postHash })
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  // const sig = await privySignMessage(remove0xPrefix({bytes32Hash: postHash}))
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
  if (!postInput) return false // prevent `postInput` from being null
  // pass postInputs into the createPost server action
  const relaySuccess = await relayPost({
    postInput: postInput,
    pathsToRevalidate: [`/channel/${targetChannelId}`, '/'],
  })
  // return relay success boolean
  return relaySuccess
}
