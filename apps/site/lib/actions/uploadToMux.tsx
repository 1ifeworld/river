'use server'
import { muxClient } from '@/config/muxClient'
import { ipfsUrlToCid, pinataUrlFromCid } from 'lib/ipfs'
import { isVideo } from 'lib/isContent'

export const maxDuration = 200

export const uploadToMux = async (
  contentType: string,
  uploadedFileCid: string,
) => {
  const assetEndpointForMux = pinataUrlFromCid({
    cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid }),
  });

  console.log("ASSET ENDPOINT MUX", assetEndpointForMux);

  const directUpload = await muxClient.Video.Uploads.create({
    cors_origin: '*',
    new_asset_settings: {
      input: assetEndpointForMux,
      playback_policy: 'public',
      ...(isVideo({ mimeType: contentType }) && {
        encoding_tier: 'baseline',
      }),
    },
  });


  const ipfsResponse = await fetch(assetEndpointForMux);
  if (!ipfsResponse.ok) {
    throw new Error('Failed to fetch file from IPFS: ' + ipfsResponse.statusText);
  }

  // Upload the file blob to Mux
  const fileBlob = await ipfsResponse.blob();
  const response = await fetch(directUpload.url, {
    method: 'PUT',
    body: fileBlob,
    headers: {
      'Content-Type': contentType,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload to Mux: ' + response.statusText);
  }

  let muxUpload = await muxClient.Video.Uploads.get(directUpload.id);
  if (!muxUpload || !muxUpload.asset_id) {
    throw new Error('Mux Asset is not available.');
  }

  const muxAsset = await muxClient.Video.Assets.get(muxUpload.asset_id);
  return {
    muxAssetId: muxAsset.id || '',
    muxPlaybackId: muxAsset.playback_ids?.[0]?.id || '',
  };
};
