import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { w3sUpload } from '@/lib'
import { Typography, Toast, Flex, Stack, Button } from '@/design-system'
import { toast } from 'sonner'

export function Dropzone({
  acceptMultipleFiles,
}: { acceptMultipleFiles: boolean }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const formData = new FormData()
      formData.append('file', file)
      const { cid } = await w3sUpload(formData)
      toast.custom((t) => (
        <Toast>
          <Typography>{`Successfully uploaded ${file.name}`}</Typography>
        </Toast>
      ))
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: acceptMultipleFiles,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
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
