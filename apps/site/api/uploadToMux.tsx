'use server'
import { muxClient } from '@/config/muxClient'
import { ipfsUrlToCid, pinataUrlFromCid } from 'lib/ipfs'
import { isVideo } from 'lib/isContent'


const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        return response
      }
      console.error(`Attempt ${attempt} failed: ${response.statusText}`)
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Attempt ${attempt} failed: ${error.message}`)
      } else {
        console.error(`Attempt ${attempt} failed with an unknown error`)
      }
      if (attempt === maxRetries) {
        throw error
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
  }
}


export const uploadToMux = async (
  contentType: string,
  uploadedFileCid: string,
) => {
  const assetEndpointForMux = pinataUrlFromCid({
    cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid }),
  })

  console.log("ASSET ENDPOINT", assetEndpointForMux)

  const asset = await muxClient.Video.Assets.create({
    input: assetEndpointForMux,
    playback_policy: [
      'public'
    ],
    encoding_tier: 'baseline',
  });

console.log("direct upload", asset)

// const ipfsResponse = await fetchWithRetry(assetEndpointForMux, {}, 10)

// console.log("ipfsResponse:", ipfsResponse)

//   if (!ipfsResponse?.ok) {
//     throw new Error('Failed to fetch file from IPFS: ' + ipfsResponse?.statusText)
//   }

//   const fileBlob = await ipfsResponse.blob()
//   const response = await fetch(directUpload.url, {
//     method: 'PUT',
//     body: fileBlob,
//     headers: {
//       'Content-Type': contentType,
//     },
//   })


//   if (!response.ok) {
//     throw new Error('Failed to upload to Mux: ' + response.statusText)
//   }


    const muxAsset = await muxClient.Video.Assets.get(asset.id)
    
    console.log(muxAsset) 

    return asset
  }