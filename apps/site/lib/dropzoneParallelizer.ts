import {
  w3sUpload,
  determineContentType,
  isAudio,
  isGLB,
  isPdf,
  isText,
  isVideo,
  processCreatePubPost,
  sendToDb,
  uploadToMux,
  MetadataObject,
} from "@/lib";
import { Typography, Toast, Flex, Stack, Button } from "@/design-system";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { SignMessageModalUIOptions } from "@privy-io/react-auth";
import { toast } from "sonner";

export async function dropzoneParallelizer({
  params,
  targetUserId,
  acceptedFiles,
  signMessage,
}: {
  params: Params;
  targetUserId: bigint;
  acceptedFiles: File[];
  signMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined
  ) => Promise<string>;
}) {
  const processLimit = 10;
  let promiseArray = [];

  for (const file of acceptedFiles) {
    const promise = processFile({ params, targetUserId, file, signMessage });
    promiseArray.push(promise);

    if (promiseArray.length === processLimit) {
      await Promise.allSettled(promiseArray);
      promiseArray = [];
    }
  }

  if (promiseArray.length > 0) {
    await Promise.allSettled(promiseArray);
  }
}

async function processFile({
  params,
  targetUserId,
  file,
  signMessage,
}: {
  params: Params;
  targetUserId: bigint;
  file: File;
  signMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined
  ) => Promise<string>;
}) {
  // Processing logic for each file
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { cid } = await w3sUpload(formData);

    if (cid) {
      console.log(cid);
      const uploadedFileName = file.name || "unnamed";
      const contentType = determineContentType(file);
      const contentTypeKey =
        isVideo({ mimeType: contentType }) || isAudio({ mimeType: contentType })
          ? 2
          : isPdf({ mimeType: contentType }) || isGLB(file) || isText(file)
          ? 1
          : 0;

      const animationUri =
        contentTypeKey === 2 || contentTypeKey === 1 ? cid : "";
      const imageUri = contentTypeKey === 0 ? cid : "";

      const metadataObject: MetadataObject = {
        name: uploadedFileName,
        description: "Dynamic metadata based on timestamp",
        image: imageUri,
        animationUri: animationUri,
      };
      let muxAssetId;
      let muxPlaybackId;

      if (contentTypeKey === 2) {
        const { id, playbackId } = await uploadToMux(animationUri);
        muxAssetId = id;
        muxPlaybackId = playbackId;
      }

      await sendToDb({
        key: cid,
        value: {
          ...metadataObject,
          contentType: contentType,
          muxAssetId: muxAssetId,
          muxPlaybackId: muxPlaybackId,
        },
      });

      if (signMessage && targetUserId) {
        await processCreatePubPost({
          pubUri: cid,
          targetChannelId: BigInt(params.id as string),
          targetUserId: BigInt(targetUserId),
          privySignMessage: signMessage,
        });
      }
      //   toast.custom((t) => (
      //     <Toast>
      //       {"Successfully uploaded "}
      //       <Typography>
      //         <span className="font-bold">{file.name}</span>
      //       </Typography>
      //     </Toast>
      //   ));
    } else {
      console.log("no cid");
    }
  } catch (error) {
    console.error("Error processing file:", file.name, error);
  }
}
