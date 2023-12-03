import * as React from 'react'
import {
  Button,
  Typography,
  Stack,
  Separator,
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  Toast,
} from '@/design-system'
import { uploadFile, uploadBlob } from '@/lib'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { processCreatePubAndAddItemPost } from '@/lib'
import { useParams } from 'next/navigation'
import { useUserContext } from '@/context'

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  /**
   * Dropzone hooks
   */
  const [showFilesToUpload, setShowFilesToUpload] =
    React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
  const onDrop = React.useCallback((filesToUpload: File[]) => {
    setShowFilesToUpload(true)
    setFilesToUpload(filesToUpload)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const params = useParams()


  const { signMessage, userId: targetUserId } = useUserContext()




  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* TODO: Determine if this is the best way to uncenter this `Button` instance */}
      <div>
        <DialogTrigger asChild>
          <Button variant="link">Add item</Button>
        </DialogTrigger>
      </div>
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader>
              <DialogTitle>
                <Typography>New item</Typography>
              </DialogTitle>
            </DialogHeader>
            <Separator />
            {/* Upload form */}
            <Stack className="py-[8rem]">
              <form
                action={async () => {
                  // Prevent non-authenticated users from proceeding
                  if (!targetUserId) return
                  // Create an IPFS pointer for the uploaded item
                  const pubUri = await uploadBlob({
                    dataToUpload: {
                      name: filesToUpload[0]?.name || 'unnamed',
                      description: 'What did you think this was going to be?',
                      image: await uploadFile({ filesToUpload }),
                    },
                  })
                  // Generate create channel post for user and post transaction
                  if (signMessage) {
                  await processCreatePubAndAddItemPost({
                    pubUri: pubUri,
                    targetChannelId: BigInt(params.id as string),
                    targetUserId: targetUserId,
                    privySignMessage: signMessage,
                  })
                }
                  setDialogOpen(false)
                  // Render a toast with the name of the uploaded item(s)
                  for (const [index, file] of filesToUpload.entries()) {
                    toast.custom((t) => (
                      <Toast key={index}>
                        {'Successfully uploaded '}
                        <span className="font-bold">{file.name}</span>
                      </Toast>
                    ))
                  }
                }}
                {...getRootProps()}
                className="focus:outline-none text-center"
              >
                {!showFilesToUpload ? (
                  <>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here...</p>
                    ) : (
                      <Typography className="hover:cursor-pointer">
                        Drag and drop your files here or click here to{' '}
                        <span className="underline">browse</span>
                      </Typography>
                    )}
                  </>
                ) : (
                  <Stack className="gap-4">
                    <FileList filesToUpload={filesToUpload} />
                    <Button
                      type="submit"
                      variant="link"
                      disabled={!targetUserId}
                    >
                      Next
                    </Button>
                  </Stack>
                )}
              </form>
            </Stack>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

const FileList = ({ filesToUpload }: { filesToUpload: File[] }) => {
  return (
    <ul>
      {filesToUpload.map((file: File) => (
        <li key={file.size}>
          {file.name} - {file.size} bytes
        </li>
      ))}
    </ul>
  )
}
