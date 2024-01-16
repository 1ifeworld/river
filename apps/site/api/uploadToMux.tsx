'use server'
import { muxClient } from '@/config/muxClient'
import { ipfsUrlToCid, pinataUrlFromCid } from 'lib/ipfs'
import { isVideo } from 'lib/isContent'
import * as UpChunk from '@mux/upchunk'


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
  console.log("ASSET ENDPOINT MUX", assetEndpointForMux)

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

  console.log("post upload", directUpload)

  const ipfsResponse = await fetchWithRetry(assetEndpointForMux, {}, 10)

  if (!ipfsResponse?.ok) {
    throw new Error('Failed to fetch file from IPFS: ' + ipfsResponse?.statusText)
  }

  // Upload the file blob to Mux using UpChunk
  const fileBlob = await ipfsResponse.blob();
  console.log("FILEBLOB", fileBlob);
  
  // Create a file-like object from the Blob
  const file = {
    name: 'upload.mp4', // Give a name to your file
    type: fileBlob.type,
    size: fileBlob.size,
    slice: fileBlob.slice.bind(fileBlob), // Bind Blob's slice method
  };
  
  // Start UpChunk upload
  const upload = UpChunk.createUpload({
    endpoint: directUpload.url, // Mux's direct upload URL
    file: file as File, // Casting to File type
    chunkSize: 5120, // Size in KB
  });
  
  upload.on('error', (error) => {
    console.error('Error during upload:', error.detail);
  });
  
  upload.on('progress', (progress) => {
    console.log(`Upload progress: ${progress.detail}%`);
  });
  
  upload.on('success', () => {
    console.log("Upload successful");
  });
  
  // Poll Mux for upload status
  let muxUpload;
  let retries = 0;
  const maxRetries = 10;
  const retryInterval = 3000;
  
  do {
    await new Promise(resolve => setTimeout(resolve, retryInterval));
    muxUpload = await muxClient.Video.Uploads.get(directUpload.id);
    console.log("Retry #" + retries + " - MUXUPLOADGET", muxUpload);
    retries++;
  } while (muxUpload.status === 'waiting' && retries < maxRetries);
  
  if (!muxUpload || !muxUpload.asset_id) {
    throw new Error('Mux Asset is not available.');
  }
  
  const muxAsset = await muxClient.Video.Assets.get(muxUpload.asset_id);
  console.log("MUXASSET", muxAsset);
  return {
    muxAssetId: muxAsset.id || '',
    muxPlaybackId: muxAsset.playback_ids?.[0]?.id || '',
  }}