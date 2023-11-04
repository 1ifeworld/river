import { Web3Storage } from 'web3.storage'

export async function uploadToIPFS({
  filesToUpload,
}: { filesToUpload: File[] }) {
  const client = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
  })
  const cid = await client.put(filesToUpload, { wrapWithDirectory: false })
  console.log('Content identifier:', cid)
}
