import * as React from 'react'
import { Web3Storage } from 'web3.storage'
import { env } from '../services/env'

export function useWeb3Storage(cid: string) {
  const [unpackedMetadata, setUnpackedMetadata] = React.useState<string>('')
  const [imageCid, setImageCid] = React.useState<string>('')

  const client = new Web3Storage({
    token: env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
  })

  React.useEffect(() => {
    async function retrieve() {
      if (cid) {
        const res = await client.get(cid)
        console.log(`Got a response! [${res?.status}] ${res?.statusText}`)
        if (!res?.ok) {
          throw new Error(`failed to get ${cid}`)
        }
        const files = await res.files()
        if (files.length > 0) {
          setImageCid(files[0].cid.toString())
          setUnpackedMetadata(await files[0].text())
        }
      }
    }
    retrieve()
  }, [cid])

  return { unpackedMetadata, client, imageCid }
}
