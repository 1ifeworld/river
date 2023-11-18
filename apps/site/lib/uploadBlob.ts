import { Web3Storage } from 'web3.storage'

interface ChannelUri {
  name: string
  description: string
  coverImageUri: string
}

interface PublicationUri {
  name: string
  description: string
  image: string
}

const client = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
})

export async function uploadBlob({
  dataToUpload,
}: { dataToUpload: ChannelUri | PublicationUri }) {
  const blobData = new Blob([JSON.stringify(dataToUpload)])

  // @ts-ignore
  const cid = await client.put([blobData], { wrapWithDirectory: false })

  const uri = `ipfs://${cid}`

  console.log('Link to uploaded blob:', `https://ipfs.io/ipfs/${cid}`)

  return uri
}

export async function uploadFile({ filesToUpload }: { filesToUpload: File[] }) {
  const cid = await client.put(filesToUpload, { wrapWithDirectory: false })

  const uri = `ipfs://${cid}`

  console.log('Link to uploaded file:', `https://ipfs.io/ipfs/${cid}`)

  return uri
}
