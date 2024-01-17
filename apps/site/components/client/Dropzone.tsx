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
  dropzoneParallelizer
} from '@/lib'
import { Typography, Toast, Flex, Stack, Button } from '@/design-system'
import { toast } from 'sonner'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'

export function Dropzone({
  acceptMultipleFiles,
}: { acceptMultipleFiles: boolean }) {
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  const onDrop = async (acceptedFiles: File[]) => {
    // do undefined checks
    if (!targetUserId) {
      console.error("targetUserIdundefined in on drop call")
      return
    }      
    if (!signMessage) {
      console.error("sign message undefined in on drop call")
      return
    }
    await dropzoneParallelizer({
      params,
      targetUserId: BigInt(targetUserId), // Ensure targetUserId is correctly cast to BigInt
      acceptedFiles,
      signMessage
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: acceptMultipleFiles,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} formEncType="multipart/form-data" />
      <AddItem isDragActive={isDragActive} />
    </div>
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
