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
import { Typography, Flex, Stack, Button, Loading } from '@/design-system'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'

export function ItemDropzone() {
  const [isUploading, setIsUploading] = useState(false)
  const [progressInfo, setProgressInfo] = useState({
    fileIndex: 0,
    totalFiles: 0,
    statusHeader: '',
    statusMessage: '',
    showLoadingIcon: true,
  })

  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true)

    for (const [index, file] of acceptedFiles.entries()) {
      setProgressInfo({
        fileIndex: index + 1,
        totalFiles: acceptedFiles.length,
        statusHeader: 'Uploading',
        statusMessage:
          acceptedFiles.length > 1 ? 'Adding your files' : 'Adding your file',
        showLoadingIcon: true,
      })

      await handleFileUpload(file)
    }

    setTimeout(() => {
      setIsUploading(false)
    }, 4500)
  }

  const handleFileUpload = async (file: File) => {
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

      setProgressInfo((prev) => ({
        ...prev,
        statusHeader: 'Uploaded',
        statusMessage: 'Added to River!',
        showLoadingIcon: false,
      }))
    } else {
      console.log('No cid')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
  })

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} formEncType="multipart/form-data" />
        <AddItem isDragActive={isDragActive} isUploading={isUploading} />
      </div>
      {isUploading && <UploadProgress {...progressInfo} />}
    </>
  )
}

interface AddItemProps {
  isDragActive: boolean
  isUploading: boolean
}

function AddItem({ isDragActive, isUploading }: AddItemProps) {
  return (
    <Flex className="gap-4 items-center">
      <Stack
        className={`w-10 h-10 bg-background border border-border justify-center items-center hover:bg-primary/[0.05] transition-all cursor-pointer ${
          isDragActive ? 'bg-primary/[0.05]' : ''
        } ${isUploading ? 'cursor-not-allowed' : ''}`}
      >
        <Typography variant="h1">+</Typography>
      </Stack>
      <Button disabled={isUploading} variant="link">
        Add an item
      </Button>
    </Flex>
  )
}

interface UploadProgressProps {
  fileIndex: number
  totalFiles: number
  statusHeader: string
  statusMessage: string
  showLoadingIcon: boolean
}

function UploadProgress({
  fileIndex,
  totalFiles,
  statusHeader,
  statusMessage,
  showLoadingIcon,
}: UploadProgressProps) {
  return (
    <Stack className="bg-background border-[0.5px] border-secondary-foreground gap-1 px-4 py-3 text-primary-foreground tracking-tight font-sans text-base leading-[14px] fixed bottom-4 left-4 right-4 mx-auto w-auto md:left-auto md:w-80 md:mx-0 z-50">
      <Typography className="leading-0">
        {statusHeader} {fileIndex}/{totalFiles}
      </Typography>
      <Typography as="div" className="leading-0">
        <Flex className="text-secondary-foreground">
          {statusMessage}
          <div
            className={`${!showLoadingIcon ? 'opacity-0' : ''} pt-[3px] h-0`}
          >
            <Loading />
          </div>
        </Flex>
      </Typography>
    </Stack>
  )
}
