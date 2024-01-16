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

  const directUpload = await muxClient.Video.Uploads.create({
    cors_origin: '*',
    new_asset_settings: {
      input: assetEndpointForMux,
      playback_policy: 'public',
      ...(isVideo({ mimeType: contentType }) && {
        encoding_tier: 'baseline',
      }),
    },
  })

  const ipfsResponse = await fetchWithRetry(assetEndpointForMux, {}, 10)

  if (!ipfsResponse?.ok) {
    throw new Error('Failed to fetch file from IPFS: ' + ipfsResponse?.statusText)
  }

  // Upload the file blob to Mux
  const fileBlob = await ipfsResponse.blob()
  const response = await fetch(directUpload.url, {
    method: 'PUT',
    body: fileBlob,
    headers: {
      'Content-Type': contentType,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to upload to Mux: ' + response.statusText)
  }


  let muxUpload
  let retries = 0
  const maxRetries = 10 
  const retryInterval = 3000

  do {
    await new Promise(resolve => setTimeout(resolve, retryInterval))
    muxUpload = await muxClient.Video.Uploads.get(directUpload.id)
    retries++
  } while (muxUpload.status === 'waiting' && retries < maxRetries)

  if (!muxUpload || !muxUpload.asset_id) {
    throw new Error('Mux Asset is not available.')
  }

  const muxAsset = await muxClient.Video.Assets.get(muxUpload.asset_id)
  return {
    muxAssetId: muxAsset.id || '',
    muxPlaybackId: muxAsset.playback_ids?.[0]?.id || '',
  }
}
