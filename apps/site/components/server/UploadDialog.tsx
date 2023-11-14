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
} from '@/design-system'
import { uploadToIPFS } from '@/lib'
import { useDropzone } from 'react-dropzone'

interface UploadDialogProps {
  triggerChildren: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
}

export const UploadDialog = React.forwardRef<HTMLDivElement, UploadDialogProps>(
  ({ triggerChildren, onSelect, onOpenChange }, forwardedRef) => {
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
                  onSubmit={async (event) => {
                    event.preventDefault()
                    await uploadToIPFS({ filesToUpload })
                  }}
                  // TODO: Debug why server actions fail in this instance
                  // action={await uploadToIPFS({filesToUpload})}
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
