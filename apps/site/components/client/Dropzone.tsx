import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
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
} from '@/lib'
import { Typography, Loading, Flex, Stack, Button } from '@/design-system'
import { toast } from 'sonner'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'

export function Dropzone({
  acceptMultipleFiles,
}: { acceptMultipleFiles: boolean }) {
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  // Initialize the counter state
  const [processingCount, setProcessingCount] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)

  const onDrop = async (acceptedFiles: File[]) => {
    // Set the total number of files and reset the processing count
    setTotalFiles(acceptedFiles.length)
    setProcessingCount(0)

    for (const file of acceptedFiles) {
      await handleFileUpload(file)
    }
  }

  const renderToast = () => {
    const uploadToast = toast.custom(
      (t) => (
        <Stack className="gap-2 h-14 w-80 py-4">
          <div>
            Uploading {processingCount}/{totalFiles}
          </div>
          <Flex className="text-secondary-foreground">
            Creating a content address
            <div className="pt-[3px]">
              <Loading />
            </div>
          </Flex>
        </Stack>
      ),
      { position: 'bottom-right', duration: 8000 },
    )
  }

  const handleFileUpload = async (file: File) => {
    const uploadToast = toast.custom(
      (t) => (
        <Stack className="gap-2 h-14 w-80 py-4">
          <div>
            Uploading {processingCount}/{totalFiles}
          </div>
          <Flex className="text-secondary-foreground">
            Creating a content address
            <div className="pt-[3px]">
              <Loading />
            </div>
          </Flex>
        </Stack>
      ),
      { position: 'bottom-right', duration: 8000 },
    )

    const formData = new FormData()
    formData.append('file', file)

    const { cid } = await w3sUpload(formData)

    if (cid) {
      const uploadedFileName = file.name || 'unnamed'
      const contentType = determineContentType(file)
      const contentTypeKey =
        isVideo({ mimeType: contentType }) || isAudio({ mimeType: contentType })
          ? 2
          : isPdf({ mimeType: contentType }) || isGLB(file) || isText(file)
          ? 1
          : 0

      const animationUri =
        contentTypeKey === 2 || contentTypeKey === 1 ? cid : ''
      const imageUri = contentTypeKey === 0 ? cid : ''

      const metadataObject: MetadataObject = {
        name: uploadedFileName,
        description: 'Dynamic metadata based on timestamp',
        image: imageUri,
        animationUri: animationUri,
      }

      let muxAssetId
      let muxPlaybackId

      if (contentTypeKey === 2) {
        toast(
          <Flex>
            Processing video
            <div className="pt-[2px]">
              <Loading />
            </div>
          </Flex>,
          { position: 'bottom-right', id: uploadToast },
        )
        const { id, playbackId } = await uploadToMux(animationUri)
        muxAssetId = id
        muxPlaybackId = playbackId
      }

      await sendToDb({
        key: cid,
        value: {
          ...metadataObject,
          contentType: contentType,
          muxAssetId: muxAssetId,
          muxPlaybackId: muxPlaybackId,
        },
      })

      toast(
        <Flex>
          Adding to
          <div className="pt-[2px]">
            <Loading />
          </div>
        </Flex>,
        { position: 'bottom-right', id: uploadToast },
      )

      if (signMessage && targetUserId) {
        await processCreatePubPost({
          pubUri: cid,
          targetChannelId: BigInt(params.id as string),
          targetUserId: BigInt(targetUserId),
          privySignMessage: signMessage,
        })
      }

      toast(<Flex>Item uploaded successfully</Flex>, {
        position: 'bottom-right',
        id: uploadToast,
      })
    } else {
      console.log('no cid')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: acceptMultipleFiles,
  })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} formEncType="multipart/form-data" />
        <AddItem isDragActive={isDragActive} />
      </div>
      <Button onClick={renderToast}>Upload</Button>
    </>
  )
}

function AddItem({ isDragActive }: { isDragActive: boolean }) {
  return (
    <Flex className="gap-4 items-center">
      <Stack
        className={`w-10 h-10 bg-background border border-border justify-center items-center hover:bg-primary/[0.025] transition-all ${
          isDragActive ? 'bg-primary/[0.025]' : ''
        }`}
      >
        <Typography variant="h1">+</Typography>
      </Stack>
      <Button variant="link">Add an item</Button>
    </Flex>
  )
}

// const uploadPromise = handleFileUpload(file)
// toast.promise(uploadPromise, {
//   loading: `Uploading ${file.name} to IPFS`,
//   success: (data) => `${file.name} has been uploaded successfully`,
//   error: 'Error during upload',
//   position: 'bottom-right',
//   icon: <></>,
// })
// await uploadPromise

// const uploadToast = toast(
//   <Flex>
//     Creating a content address
//     <div className="pt-[2px]">
//       <Loading />
//     </div>
//   </Flex>,
//   { position: 'bottom-right', duration: 8000 },
// )
