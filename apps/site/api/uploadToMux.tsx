'use server'
import { muxClient } from '@/config/muxClient'
import { ipfsUrlToCid, pinataUrlFromCid } from 'lib/ipfs'
import { isVideo } from 'lib/isContent'

export const uploadToMux = async (uploadedFileCid: string, contentType: string) => {
  const assetEndpointForMux = pinataUrlFromCid({
    cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid }),
  })

  console.log('Asset Endpoint for Mux:', assetEndpointForMux);

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

  console.log('Direct Upload Response:', directUpload);

  let muxUpload;
  let retries = 0;
  const maxRetries = 200;
  const retryInterval = 5000;

  do {
    console.log(`Retry ${retries + 1}/${maxRetries}`);
    await new Promise(resolve => setTimeout(resolve, retryInterval));
    muxUpload = await muxClient.Video.Uploads.get(directUpload.id);
    console.log('Mux Upload Status:', muxUpload.status);
    retries++;
  } while (muxUpload.status === 'waiting' && retries < maxRetries);

  if (!muxUpload || !muxUpload.asset_id) {
    console.error('Mux Asset is not available.');
    throw new Error('Mux Asset is not available.');
  }

  const muxAsset = await muxClient.Video.Assets.get(muxUpload.asset_id);

  console.log('Mux Asset:', muxAsset);

  return {
    muxAssetId: muxAsset.id || '',
    muxPlaybackId: muxAsset.playback_ids?.[0]?.id || '',
  }
}
