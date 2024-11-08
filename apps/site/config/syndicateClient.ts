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

type Register = {
  to: string
  recovery: string
  deadline: number
  sig: string
}

type PostBatchFunction = {
  posts: Post[]
}

export const projectIdPost =
  process.env.SYNDICATE_PROJECT_ID_POSTGATEWAY ?? 'Error'
export const projectIdRegistry =
  process.env.SYNDICATE_PROJECT_ID_IDREGISTRY ?? 'Error'

export const generatePostBatchTxnInput = (postsArray: PostBatchFunction) => ({
  projectId: projectIdPost,
  contractAddress: addresses.postGateway.nova,
  chainId: 42170,
  functionSignature:
    'postBatch((address signer, (uint256 rid, uint256 timestamp, uint8 msgType, bytes msgBody) message, uint16 hashType, bytes32 hash, uint16 sigType, bytes sig)[] posts)',
  args: {
    posts: postsArray,
  },
})

export const generatePostTxnInput = (post: Post) => ({
  projectId: projectIdPost,
  contractAddress: addresses.postGateway.nova,
  chainId: 42170,
  functionSignature:
    'post((address signer, (uint256 rid, uint256 timestamp, uint8 msgType, bytes msgBody) message, uint16 hashType, bytes32 hash, uint16 sigType, bytes sig) post)',
  args: {
    post: post,
  },
})

export const generateIdRegistryInput = (register: Register) => ({
  projectId: projectIdRegistry,
  contractAddress: addresses.idRegistry.optimism,
  chainId: 10,
  functionSignature:
    'registerFor(address to, address recovery, uint256 deadline, bytes sig)',
  args: {
    to: register.to,
    recovery: register.recovery,
    deadline: register.deadline,
    sig: register.sig,
  },
})

export const syndicateClientPost = new SyndicateClient({ token: process.env.SYNDICATE_POST_API_KEY as string })
export const syndicateClientIdRegistry = new SyndicateClient({ token: process.env.SYNDICATE_ID_API_KEY as string })