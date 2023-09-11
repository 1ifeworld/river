import * as React from 'react'
import { Web3Storage } from 'web3.storage'

export function useWeb3Storage(cid: string) {
  const [unpackedMetadata, setUnpackedMetadata] = React.useState<string>('')

  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() as string })
  }

  React.useEffect(() => {
    async function retrieve() {
      const client = makeStorageClient()
      if (cid) {
        const res = await client.get(cid)
        console.log(`Got a response! [${res?.status}] ${res?.statusText}`)
        if (!res?.ok) {
          throw new Error(`failed to get ${cid}`)
        }
        const files = await res.files()
        for (const file of files) {
          setUnpackedMetadata(await file.text())
        }
      }
    }
    retrieve()
  }, [cid])

  return { unpackedMetadata }
}