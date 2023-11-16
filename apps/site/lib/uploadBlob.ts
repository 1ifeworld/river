import { Web3Storage } from 'web3.storage'

export async function uploadBlob({ dataToUpload }: { dataToUpload: string }) {
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
  })

  const jsonObject = {
    name: 'name',
    description: 'description',
    coverImageUri: 'coverImageUri',
  }

  const blobData = new Blob([JSON.stringify(jsonObject)])

  // @ts-expect-error
  const cid = await client.put([blobData], { wrapWithDirectory: false })

  const uri = `ipfs://${cid}`

  console.log('Blob uri:', uri)

  return uri
}
