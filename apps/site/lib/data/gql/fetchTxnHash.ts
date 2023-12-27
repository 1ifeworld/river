import { client } from './client'

export async function fetchTxnHash({ hash }: { hash: string }) {
  try {
    const txnHash = await client.query({
      txn: {
        __args: {
          id: hash,
        },
        id: true,
      },
    })
    return {
      success: true,
      data: txnHash.txn,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}
