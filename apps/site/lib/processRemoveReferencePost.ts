import { relayPost } from '@/actions'
import {
  encodePost,
  encodeMessage,
  encodeCreateChannel,
  postTypes,
  messageTypes,
  getExpiration,
  generateHashForPostSig,
  remove0xPrefix,
  encodeRemoveReference,
} from 'scrypt'
import {
  Address,
  Hash,
  recoverMessageAddress,
  toBytes,
  keccak256,
  encodeAbiParameters,
  verifyMessage,
} from 'viem'
import { SignMessageModalUIOptions } from '@privy-io/react-auth'

export interface ProcessRemoveReferencePostProps {
  targetUserId: bigint
  targetChannelId: bigint
  targetReferenceId: bigint
  privySignerAddress: string
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}

export async function processRemoveReferencePost({
  targetUserId,
  targetChannelId,
  targetReferenceId,
  privySignerAddress,
  privySignMessage,
}: ProcessRemoveReferencePostProps) {
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration = getExpiration()

  const removeReferenceMsg = encodeRemoveReference({
    channelId: targetChannelId,
    referenceId: targetReferenceId,
  })

  if (!removeReferenceMsg) return // prevent `msgBody` from being null

  const encodedMsg = encodeMessage({
    msgType: Number(messageTypes.removeReference),
    msgBody: removeReferenceMsg.msgBody,
  })

  if (!encodedMsg) return // prevent `encodedMsg` from being null

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

  if (!postInput) return // prevent `postInput` from being null

  await relayPost({
    postInput: postInput,
    pathToRevalidate: `/channel/${targetChannelId}`,
  })
}
