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
  DropdownMenuItem,
  Form,
  Toast,
} from '@/design-system'
import { uploadToIPFS } from '@/lib'
import { getChannels, type ChannelQuery } from '@/gql'
import { createPublication } from '@/actions'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

interface UploadDialogProps {
  triggerChildren: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
  userId: bigint
}

export const UploadDialog = React.forwardRef<HTMLDivElement, UploadDialogProps>(
  ({ triggerChildren, onSelect, onOpenChange, userId }, forwardedRef) => {
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

    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            ref={forwardedRef}
            onSelect={(event) => {
              event.preventDefault()
              onSelect && onSelect()
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
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
                    // Create an IPFS pointer for the uploaded item
                    const pubUri = await uploadToIPFS({ filesToUpload })

                    const channels = await getChannels()

                    await createPublication({
                      userId: userId as bigint,
                      adminIds: [userId as bigint],
                      memberIds: [],
                      pubUri,
                    })

                    onOpenChange(false)

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
                      <Button type="submit" variant="link">
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
  },
)

const ChannelList = ({ channels} : { ChannelQuery }) => {
  return(
    
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
