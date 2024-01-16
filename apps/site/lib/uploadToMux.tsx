import { ipfsUrlToCid, pinataUrlFromCid } from "lib/ipfs";
import { isVideo } from "lib/isContent";
import Mux from "@mux/mux-node";

export const { Video } = new Mux();

export const uploadToMux = async (
  contentType: string,
  uploadedFileCid: string
) => {
  const assetEndpointForMux = pinataUrlFromCid({
    cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid }),
  });



  const asset = await Video.Assets.create({
    input: assetEndpointForMux,
    playback_policy: "public",
    ...(isVideo({ mimeType: contentType }) && {
      encoding_tier: "baseline",
    }),
  })

  return {id: asset.id, playbackId: asset.playback_ids?.[0].id }
};
