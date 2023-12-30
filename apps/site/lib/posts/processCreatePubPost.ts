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
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration: bigint = getExpiration()
  // generate encoded msgBody for createChannelMsg
  const createPubMsg = encodeCreatePublication({
    uri: pubUri,
    channelTags: [targetChannelId],
  })
  // add this in to prevent msgBody from being null
  if (!createPubMsg) return
  console.log('encoded pub and createPub msgBody correctly')
  const encodedMessage = encodeMessage({
    msgType: Number(messageTypes.createPublication),
    msgBody: createPubMsg.msgBody,
  })
  // add this in to prevent either encoded messages from being null
  if (!encodedMessage) return
  console.log('encoded create pub message correctly')
  // generate the bytes[] messageArray
  const messageArray: Hash[] = [encodedMessage?.encodedMessage]
  // NOTE: this encoding step should be a scrypt export as well
  // bytes32 messageToBeSigned = keccak256(abi.encode(version, expiration, msgArray)).toEthSignedMessageHash();
  const postHash = generateHashForPostSig({
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
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
  if (!postInput) return
  console.log('postInput encoded correctly', postInput)
  // pass postInputs into the createPost server action
  await relayPost({
    postInput: postInput,
    pathsToRevalidate: [`/channel/${targetChannelId}`, '/'],
  })
}
