import sdk from '../client'

export async function getTxnWithHash({ hash }: { hash: string }) {
  const response = await sdk.txnHash({
    hash: hash,
  })

  return { txn: response.txn }
}
