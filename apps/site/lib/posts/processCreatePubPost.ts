import { relayPost } from 'lib/actions'
import {
  encodePost,
  encodeMessage,
  encodeCreatePublication,
  postTypes,
  messageTypes,
  getExpiration,
  generateHashForPostSig,
  remove0xPrefix,
} from 'scrypt'
import { Hash } from 'viem'
import { SignMessageModalUIOptions } from '@privy-io/react-auth'

export async function processCreatePubPost({
  pubUris,
  targetChannelId,
  targetUserId,
  privySignMessage,
}: {
  pubUris: string[]
  targetChannelId: bigint
  targetUserId: bigint
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}) {
  console.log(`Processing ${pubUris.length} publication(s)`)

  const postVersion = postTypes.v1
  const postExpiration: bigint = getExpiration()
  let messageArray: Hash[] = []

  // Process each publication URI
  for (const pubUri of pubUris) {
    console.log(`Processing publication URI: ${pubUri}`)

    const createPubMsg = encodeCreatePublication({
      uri: pubUri,
      channelTags: [targetChannelId],
    })

    if (!createPubMsg) {
      console.log('Failed to encode publication message')
      continue
    }

    const encodedMessage = encodeMessage({
      msgType: Number(messageTypes.createPublication),
      msgBody: createPubMsg.msgBody,
    })

    if (!encodedMessage) {
      console.log('Failed to encode message')
      continue
    }

    // Add the encoded message to the message array
    messageArray.push(encodedMessage.encodedMessage)
  }

  // Generate hash for the aggregated message array
  const postHash = generateHashForPostSig({
    version: postVersion,
    expiration: postExpiration,
    messageArray,
  })

  // Remove 0x prefix for signature
  const postHashForSig = remove0xPrefix({ bytes32Hash: postHash })

  // Get the signature
  const sig = (await privySignMessage(postHashForSig)) as Hash

  // Encode data for the transaction
  const postInput = encodePost({
    userId: targetUserId,
    hashType: postTypes.hashScheme1,
    hash: postHash,
    sigType: postTypes.sigTypeECDSA,
    sig: sig,
    version: postVersion,
    expiration: postExpiration,
    messageArray,
  })

  if (!postInput) {
    console.log('Failed to encode post input')
    return
  }

  console.log('Encoded post input successfully')

  // Send the transaction
  await relayPost({
    postInput: postInput,
    pathsToRevalidate: [`/channel/${targetChannelId}`, '/'],
  })

  console.log('Post relayed successfully')
}
