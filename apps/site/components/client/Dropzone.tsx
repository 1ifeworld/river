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
  MetadataObject,
} from '@/lib'
import { uploadToMux } from 'api'
import { Typography, Toast, Flex, Stack, Button } from '@/design-system'
import { toast } from 'sonner'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'
import { muxClient } from '@/config/muxClient'

export function Dropzone({
  acceptMultipleFiles,
}: { acceptMultipleFiles: boolean }) {
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  const onDrop = async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const formData = new FormData()
      formData.append('file', file)
      const { cid } = await w3sUpload(formData)


      if (cid) {
        const uploadedFileName = file.name || 'unnamed'
        const contentType = determineContentType(file)
        const contentTypeKey =
          isVideo({ mimeType: contentType }) ||
          isAudio({ mimeType: contentType })
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

        if (contentTypeKey === 2 ) {
          const {id, uploadId} = await uploadToMux(contentType, animationUri)
          const {playback_ids: playbackId} = await muxClient.Video.Assets.get(uploadId)
          muxAssetId = id
          muxPlaybackId = playbackId ? playbackId.join(', ') : undefined
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

        toast.custom((t) => (
          <Toast>
            {'Successfully uploaded '}
            <Typography>
              <span className="font-bold">{file.name}</span>
            </Typography>
          </Toast>
        ))
      } else {
        console.log('no cid')
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: acceptMultipleFiles,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} formEncType='multipart/form-data' />
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
