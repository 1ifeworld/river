import React, { useState } from 'react'
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
import {
  Typography,
  Loading,
  Flex,
  Stack,
  Button,
  Toaster,
} from '@/design-system'
import { toast } from 'sonner'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'

export function Dropzone({
  acceptMultipleFiles,
}: { acceptMultipleFiles: boolean }) {
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  const onDrop = async (acceptedFiles: File[]) => {
    for (const [index, file] of acceptedFiles.entries()) {
      const progressInfo = {
        fileIndex: index + 1,
        totalFiles: acceptedFiles.length,
      }
      await handleFileUpload(file, progressInfo)
    }
  }

  const handleFileUpload = async (
    file: File,
    progressInfo: { fileIndex: number; totalFiles: number },
  ) => {
    const uploadToast = toast.custom(
      (t) => (
        <ProgressToast
          {...progressInfo}
          toastHeader={'Uploading'}
          toastBody={'Creating a content address'}
          renderIcon={true}
        />
      ),
      { position: 'bottom-right', duration: 15000 },
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
        toast.custom(
          (t) => (
            <ProgressToast
              {...progressInfo}
              toastHeader={'Uploading'}
              toastBody={'Processing video'}
              renderIcon={true}
            />
          ),
          { id: uploadToast },
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

      if (signMessage && targetUserId) {
        await processCreatePubPost({
          pubUri: cid,
          targetChannelId: BigInt(params.id as string),
          targetUserId: BigInt(targetUserId),
          privySignMessage: signMessage,
        })
      }

      toast.custom(
        (t) => (
          <ProgressToast
            {...progressInfo}
            toastHeader={'Uploaded'}
            toastBody={'Added to River!'}
            renderIcon={false}
          />
        ),
        { id: uploadToast },
      )

      setTimeout(() => {
        toast.dismiss(uploadToast)
      }, 3500)
    } else {
      console.log('No cid')
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
    </>
  )
}

function AddItem({ isDragActive }: { isDragActive: boolean }) {
  return (
    <Flex className="gap-4 items-center">
      <Stack
        className={`w-10 h-10 bg-background border border-border justify-center items-center cursor-pointer hover:bg-primary/[0.05] transition-all ${
          isDragActive ? 'bg-primary/[0.05]' : ''
        }`}
      >
        <Typography variant="h1">+</Typography>
      </Stack>
      <Button variant="link">Add an item</Button>
    </Flex>
  )
}

interface ProgressToastProps {
  toastHeader: string
  toastBody: string
  renderIcon: boolean
  fileIndex: number
  totalFiles: number
}

function ProgressToast({
  toastHeader,
  toastBody,
  renderIcon,
  fileIndex,
  totalFiles,
}: ProgressToastProps) {
  return (
    <Stack className="gap-1 min-w-80 py-[2px]">
      <div>
        {toastHeader} {fileIndex}/{totalFiles}
      </div>
      <Flex className="text-secondary-foreground">
        {toastBody}
        {/* Invisible placeholder for the loading component to avoid layout shift */}
        <div className={`pt-[3px] ${renderIcon ? '' : 'opacity-0'}`}>
          <Loading />
        </div>
      </Flex>
    </Stack>
  )
}
