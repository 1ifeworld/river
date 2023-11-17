import { Web3Storage } from 'web3.storage'

interface UploadBlobProps {
  name: string
  description: string
  coverImageUri: string
}

export async function uploadBlob({
  dataToUpload,
}: { dataToUpload: UploadBlobProps }) {
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
  })

  const blobData = new Blob([JSON.stringify(dataToUpload)])

  // @ts-ignore
  const cid = await client.put([blobData], { wrapWithDirectory: false })

  const uri = `ipfs://${cid}`

  console.log('Link to uploaded data:', `https://ipfs.io/ipfs/${cid}`)

  return uri
}
