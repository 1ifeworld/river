import sdk from '../client'
import { unstable_cache } from 'next/cache'

export const getTxnWithHash = unstable_cache(
  async ({ hash }: { hash: string }) => {
    const response = await sdk.txnHash({
      hash: hash,
    })

    return { txn: response.txn }
  },
  ['txnHash'],
)
