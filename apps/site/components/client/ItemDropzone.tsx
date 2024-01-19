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
import { Typography, Flex, Stack, Button } from '@/design-system'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'
import { UploadProgress } from '@/client'
import { type Channel } from '@/gql'

export function ItemDropzone({channel}: {channel: Channel}) {
  const [isUploading, setIsUploading] = useState(false)
  const [progressInfo, setProgressInfo] = useState({
    fileIndex: 0,
    totalFiles: 0,
    statusHeader: '',
    statusMessage: '',
    showLoadingIcon: true,
  })

  const { signMessage, userId: targetUserId, authToken } = useUserContext()
  const params = useParams()
  const showDropzone =  
    channel.admins.includes(targetUserId)
    || channel.members.includes(targetUserId)
    ? true
    : false
  

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true)

    for (const [index, file] of acceptedFiles.entries()) {
      setProgressInfo({
        fileIndex: index + 1,
        totalFiles: acceptedFiles.length,
        statusHeader: 'Uploading',
        statusMessage: `Adding ${file.name}`,
        showLoadingIcon: true,
      })

      await handleFileUpload(file, index + 1)
    }

    setProgressInfo((prev) => ({
      ...prev,
      statusHeader: 'Uploaded',
      statusMessage: 'Complete!',
      showLoadingIcon: false,
    }))

    setTimeout(() => {
      setIsUploading(false)
    }, 4500)
  }

  const handleFileUpload = async (file: File, fileIndex: number) => {
    const formData = new FormData()
    formData.append('file', file)
    const verifying = await authToken
    const { cid } = await w3sUpload(formData, verifying)

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
        const muxVerifyingKey = await authToken
        const { id, playbackId } = await uploadToMux(animationUri, muxVerifyingKey)
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
        const txSuccess = await processCreatePubPost({
          pubUri: cid,
          targetChannelId: BigInt(params.id as string),
          targetUserId: BigInt(targetUserId),
          privySignMessage: signMessage,
        })
        if (!txSuccess) {
          setProgressInfo((prev) => ({
            ...prev,
            fileIndex: fileIndex - 1,
            statusHeader: 'Error',
            statusMessage: 'Transaction failed, try again!',
            showLoadingIcon: false,
          }))
        }
      }
    } else {
      setProgressInfo((prev) => ({
        ...prev,
        statusHeader: 'Error',
        statusMessage: 'Trouble fetching content address!',
        showLoadingIcon: false,
      }))
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
  })

  return (
    <>
      {showDropzone && (
        <div {...getRootProps()}>
          <input {...getInputProps()} formEncType="multipart/form-data" />
          <AddItem isDragActive={isDragActive} isUploading={isUploading} />
        </div>
      )}
      {isUploading && <UploadProgress {...progressInfo} />}
    </>
  );
  
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
