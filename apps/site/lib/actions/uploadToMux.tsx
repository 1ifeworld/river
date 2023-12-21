'use server'
import { muxClient } from '@/config/muxClient'
import { pinataUrlFromCid, ipfsUrlToCid } from 'lib/ipfs'
import { isVideo } from 'lib/isContent'

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

  const ipfsResponse = await fetch(assetEndpointForMux)
  if (!ipfsResponse.ok) {
    throw new Error(
      'Failed to fetch file from IPFS: ' + ipfsResponse.statusText,
    )
  }

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
  let attempts = 0
  const maxAttempts = 40
  while ((!muxUpload || !muxUpload.asset_id) && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 8000))
    try {
      muxUpload = await muxClient.Video.Uploads.get(directUpload.id)
      if (muxUpload.status === 'asset_created') {
        break
      }
      attempts++
    } catch (error) {
      console.error('Error fetching Mux Upload:', error)
      break
    }
  }

  if (!muxUpload || !muxUpload.asset_id) {
    throw new Error('Mux Asset is not available after maximum attempts.')
  }

  const muxAsset = await muxClient.Video.Assets.get(muxUpload.asset_id)
  return {
    muxAssetId: muxAsset.id || '',
    muxPlaybackId: muxAsset.playback_ids?.[0]?.id || '',
  }
}
