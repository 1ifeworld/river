import {
  BaseError,
  BlockTag,
  Client,
  Hex,
  NonceTooHighError,
  NonceTooLowError,
} from 'viem'
import { getTransactionCount } from 'viem/actions'
import PQueue from 'p-queue'

export type CreateNonceManagerOptions = {
  client: Client
  address: Hex
  blockTag?: BlockTag
}

export type CreateNonceManagerResult = {
  hasNonce: () => boolean
  nextNonce: () => number
  resetNonce: () => Promise<void>
  shouldResetNonce: (error: unknown) => boolean
  mempoolQueue: PQueue
}

export function createNonceManager({
  client,
  address, // TODO: rename to account?
  blockTag = 'pending',
}: CreateNonceManagerOptions): CreateNonceManagerResult {
  const nonceRef = { current: -1 }
  let channel: BroadcastChannel | null = null

  if (typeof BroadcastChannel !== 'undefined') {
    const channelName = 'relayerBroadcast'
    channel = new BroadcastChannel(channelName)
    channel.addEventListener('message', (event) => {
      const nonce = JSON.parse(event.data)
      console.log('get nonce from broadcast channel', nonce)
      nonceRef.current = nonce
    })
  }

  function hasNonce(): boolean {
    return nonceRef.current >= 0
  }

  function nextNonce(): number {
    if (!hasNonce()) throw new Error('call resetNonce before using nextNonce')
    const nonce = nonceRef.current++
    channel?.postMessage(JSON.stringify(nonceRef.current))
    return nonce
  }

  async function resetNonce(): Promise<void> {
    const nonce = await getTransactionCount(client, { address, blockTag })
    nonceRef.current = nonce
    channel?.postMessage(JSON.stringify(nonceRef.current))
    console.log('reset nonce to', nonceRef.current)
  }

  function shouldResetNonce(error: unknown): boolean {
    return (
      error instanceof BaseError &&
      error.walk(
        (e) => e instanceof NonceTooLowError || e instanceof NonceTooHighError,
      ) != null
    )
  }

  const mempoolQueue = new PQueue({ concurrency: 1 })

  return {
    hasNonce,
    nextNonce,
    resetNonce,
    shouldResetNonce,
    mempoolQueue,
  }
}
