import { relayPost } from '@/actions'
import {
  encodePost,
  encodeMessage,
  postTypes,
  messageTypes,
  getExpiration,
  generateHashForPostSig,
} from 'scrypt'
import { Hash, encodeAbiParameters } from 'viem'

import { SignMessageModalUIOptions } from '@privy-io/react-auth'

interface ProcessRemoveItemsProps {
    targetChannelId: bigint
    targetUserId: bigint
    privySignMessage: (
      message: string,
      uiOptions?: SignMessageModalUIOptions | undefined,
    ) => Promise<string>
    itemsToRemove: bigint[]
}

export async function processRemoveItemsPost({
  targetChannelId,
  targetUserId,
  privySignMessage,
  itemsToRemove,
}: ProcessRemoveItemsProps
  
) {
  // Declare constants/params
  const postVersion = postTypes.v1
  const postExpiration = getExpiration()

  // Generate encoded `msgBody` for `removeItemMsg`
  const encodedData = encodeAbiParameters(
    [
      { name: 'itemsToRemove', type: 'uint256[]' }
    ],
    [itemsToRemove]
  )

  const encodedRemoveItemMsg = encodeMessage({
    msgType: messageTypes.removeItems,
    msgBody: encodedData, // abi.encode(uint256[])
  })

  // Generate the message array
  const messageArray = [
    encodedRemoveItemMsg?.encodedMessage as Hash,
  ]

  // bytes32 messageToBeSigned = keccak256(abi.encode(version, expiration, msgArray)).toEthSignedMessageHash()
  const hashToSign = generateHashForPostSig({
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
  })

  // Get signature from user over signed hash of encodePacked version + expiration + messages
  const sig = await privySignMessage(hashToSign)
  
  // Generate encodedPost bytes data -- this is the input to the `post` function`
  const postInput = encodePost({
    userId: targetUserId,
    sigType: postTypes.sigTypeECDSA,
    sig: sig as Hash,
    version: postVersion,
    expiration: postExpiration,
    messageArray: messageArray,
  })
  
  if (!postInput) return // prevent postInput(s) from being null
  
  await relayPost({
    postInput: postInput,
    pathToRevalidate: `/channel/${targetChannelId}`,
  })
}
