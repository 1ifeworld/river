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
  MetadataObject
} from '@/lib'
import { Typography, Toast, Flex, Stack, Button } from '@/design-system'
import { MAX_FILE_SIZE, ACCEPTED_ITEM_MIME_TYPES } from '@/lib'
import { toast } from 'sonner'
import { useUserContext } from '@/context'
import { useParams } from 'next/navigation'
import { useWeb3Storage } from '@/hooks'

export function Dropzone({
  acceptMultipleFiles,
}: { acceptMultipleFiles: boolean }) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()
  const { client } = useWeb3Storage()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (uploadedFiles.length === 0 && acceptedFiles.length > 0) {
      setUploadedFiles([acceptedFiles[0]])
    }

    for (const file of acceptedFiles) {
      const uploadedFileName = file.name || 'unnamed'
      const contentType = determineContentType(file)

      const uploadedFileCid = await client?.uploadFile(file)
      const contentTypeKey =
        isVideo({ mimeType: contentType }) || isAudio({ mimeType: contentType })
          ? 2
          : isPdf({ mimeType: contentType }) || isGLB(file) || isText(file)
          ? 1
          : 0

      const animationUri =
        contentTypeKey === 2 || contentTypeKey === 1 ? uploadedFileCid : ''
      const imageUri = contentTypeKey === 0 ? uploadedFileCid : ''

      const metadataObject: MetadataObject = {
        name: uploadedFileName,
        description: 'Dynamic metadata based on timestamp',
        image: imageUri?.toString() as string,
        animationUri: animationUri?.toString() as string,
      }

      const pubUri = await client?.uploadFile(
        new Blob([JSON.stringify(metadataObject)], { type: 'application/json' })
      )

      let muxAssetId = ''
      let muxPlaybackId = ''

      if (contentTypeKey === 2) {
        const muxUploadResult = await uploadToMux(
          contentType,
          animationUri?.toString() as string
        )
        muxAssetId = muxUploadResult.muxAssetId
        muxPlaybackId = muxUploadResult.muxPlaybackId
      }

      await sendToDb({
        key: pubUri?.toString() as string,
        value: {
          ...metadataObject,
          contentType: contentType,
          muxAssetId: muxAssetId,
          muxPlaybackId: muxPlaybackId,
        },
      })

      if (signMessage && targetUserId) {
        await processCreatePubPost({
          pubUri: pubUri?.toString() as string,
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
    }
  }, [uploadedFiles, client, signMessage, targetUserId, params.id])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: acceptMultipleFiles,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_ITEM_MIME_TYPES,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <AddItem isDragActive={isDragActive} />
      {uploadedFiles.length > 0 && (
        <FileListToast files={uploadedFiles} uploading={false} />
      )}
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

function FileListToast({ files, uploading }: { files: File[], uploading: boolean }) {
  return (
    <Toast>
      <Typography variant="h2">{uploading ? 'Uploading Files...' : 'Uploaded Files:'}</Typography>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </Toast>
  )
}

