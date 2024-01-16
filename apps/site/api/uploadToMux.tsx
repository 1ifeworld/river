'use server'
import { muxClient } from '@/config/muxClient'
import { ipfsUrlToCid, pinataUrlFromCid } from 'lib/ipfs'
import { isVideo } from 'lib/isContent'

export const uploadToMux = async (uploadedFileCid: string, contentType: string) => {
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
  });

  let muxUpload, retries = 0;
  const maxRetries = 10, retryInterval = 3000

  do {
    await new Promise(resolve => setTimeout(resolve, retryInterval));
    muxUpload = await muxClient.Video.Uploads.get(directUpload.id);
    retries++;
  } while (muxUpload.status === 'waiting' && retries < maxRetries);

  if (!muxUpload || !muxUpload.asset_id) {
    throw new Error('Mux Asset is not available.');
  }
  const muxAsset = await muxClient.Video.Assets.get(muxUpload.asset_id);
  return {
    muxAssetId: muxAsset.id || '',
    muxPlaybackId: muxAsset.playback_ids?.[0]?.id || '',
  };
};

