import { Web3Storage } from 'web3.storage'

export async function uploadBlob({ dataToUpload }: { dataToUpload: string }) {
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
  })
  const blobData = new Blob([dataToUpload])

  // @ts-ignore
  const cid = await client.put([blobData], { wrapWithDirectory: false })

  const uri = `ipfs://${cid}`

  console.log('Blob uri:', uri)

  return uri
}
