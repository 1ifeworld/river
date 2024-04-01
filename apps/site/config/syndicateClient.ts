import { SyndicateClient } from '@syndicateio/syndicate-node'
import { addresses } from 'scrypt'

type PostMessage = {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: string
}

type Post = {
  signer: string
  message: PostMessage
  hashType: number
  hash: string
  sigType: number
  sig: string
}

type PostBatchFunction = {
  posts: Post[]
}

export const syndicate = new SyndicateClient({
  token: () => {
    const apiKey = process.env.SYNDICATE_API_KEY
    if (typeof apiKey === 'undefined') {
      throw new Error(
        'SYNDICATE_API_KEY is not defined in environment variables.',
      )
    }
    return apiKey
  },
})

export const projectId = process.env.SYNDICATE_PROJECT_ID_POSTGATEWAY

if (!projectId) {
  throw new Error(
    'SYNDICATE_PROJECT_ID_POSTGATEWAY is not defined in environment variables.',
  )
}

export const postBatchObject = (postsArray: PostBatchFunction) => ({
  projectId: projectId,
  contractAddress: addresses.postGateway.nova,
  chainId: 42170,
  functionSignature:
    'postBatch((address signer, (uint256 rid, uint256 timestamp, uint8 msgType, bytes msgBody) message, uint16 hashType, bytes32 hash, uint16 sigType, bytes sig)[] posts)',
  args: {
    posts: postsArray,
  },
})

export const postObject = (post: Post) => ({
  projectId: projectId,
  contractAddress: addresses.postGateway.nova,
  chainId: 42170,
  functionSignature:
    'post((address signer, (uint256 rid, uint256 timestamp, uint8 msgType, bytes msgBody) message, uint16 hashType, bytes32 hash, uint16 sigType, bytes sig) post)',
  args: {
    post: post,
  },
})
