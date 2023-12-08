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
  DialogFooter,
  DialogClose,
  Toast,
} from '@/design-system'
import { uploadFile, uploadBlob, processCreatePubAndAddItemPost } from '@/lib'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useUserContext } from '@/context'
import { usePrivy } from '@privy-io/react-auth'
import { DataObject, sendToDb } from '@/lib'

function isImage({mimeType}: {mimeType: string}) {
  return ['image/jpeg', 'image/png'].includes(mimeType)
}

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { authenticated, login } = usePrivy()

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
      {!authenticated ? (
        <div>
          <Button variant="link" onClick={login}>
            Add item
          </Button>
        </div>
      ) : (
        <div>
          <DialogTrigger asChild>
            <Button variant="link">Add item</Button>
          </DialogTrigger>
        </div>
      )}
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] aspect-square focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader>
              <DialogTitle>
                <Typography>Add item</Typography>
              </DialogTitle>
            </DialogHeader>
            <DialogClose asChild className="absolute right-4 top-8">
              <Button variant="link">
                <Typography>close</Typography>
              </Button>
            </DialogClose>
            <Separator />
            {/* Upload form */}
            <Stack className="justify-center h-full">
              <form
                id="newUpload"
                action={async () => {
                  // Prevent non-authenticated users from proceeding
                  if (!targetUserId) return
                  // Create an IPFS pointer for the uploaded item
                  const uploadedFileCid = await uploadFile({ filesToUpload })
                  const uploadedFileName = filesToUpload[0]?.name || 'unnamed'
                  const uploadedFileType = filesToUpload[0].type
                  const hardcodedDescription = 'What did you think this was going to be?'

                  // if image set image field, and leave animation blank
                  // if not image, do opposite
                  let pubUri;
                  if (isImage({mimeType: uploadedFileType})) {
                    pubUri = await uploadBlob({
                      dataToUpload: {
                        name: uploadedFileName,
                        description: hardcodedDescription,
                        image: uploadedFileCid,
                        animationUri: ""
                      },
                    })
                    await sendToDb({
                      key: pubUri,
                      value: {
                        name: uploadedFileName,
                        description: hardcodedDescription,
                        image: uploadedFileCid,
                        animationUri: "",
                        contentType: uploadedFileType,
                      },
                    } as DataObject)
                  } else {
                    pubUri = await uploadBlob({
                      dataToUpload: {
                        name: uploadedFileName,
                        description: hardcodedDescription,
                        image: "",
                        animationUri: uploadedFileCid
                      },
                    })
                    await sendToDb({
                      key: pubUri,
                      value: {
                        name: uploadedFileName,
                        description: hardcodedDescription,
                        image: "",
                        animationUri: uploadedFileCid,
                        contentType: uploadedFileType,
                      },
                    } as DataObject)                    
                  }  

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
                      <Typography className="text-secondary-foreground">
                        Drop your files here
                      </Typography>
                    ) : (
                      <Typography className="hover:cursor-pointer text-secondary-foreground leading-1">
                        Drag and drop your files here <br /> or click here to{' '}
                        <span className="underline">browse</span>
                      </Typography>
                    )}
                  </>
                ) : (
                  <div className="h-full">
                    <FileList filesToUpload={filesToUpload} />
                  </div>
                )}
              </form>
            </Stack>
            {showFilesToUpload && (
              <>
                <Separator />
                <DialogFooter>
                  <Button
                    form="newUpload"
                    type="submit"
                    variant="link"
                    disabled={!targetUserId}
                  >
                    <Typography>Confirm</Typography>
                  </Button>
                </DialogFooter>
              </>
            )}
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
          <Typography className="text-secondary-foreground">
            {file.name}
          </Typography>
        </li>
      ))}
    </ul>
  )
}
