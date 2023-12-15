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
import {
  uploadFile,
  uploadBlob,
  processCreatePubPost,
  ipfsUrlToCid,
  pinataUrlFromCid,
  DataObject,
  sendToDb,
  isImage,
  isGLB,
  isVideo,
  isAudio,
} from '@/lib'
import { useUserContext } from '@/context'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { muxClient } from '@/config/muxClient'
import { FileList } from '@/server'

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { authenticated, login } = usePrivy()
  const [showFileList, setShowFileList] = React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  const onDrop = React.useCallback((filesToUpload: File[]) => {
    setShowFileList(true)
    setFilesToUpload(filesToUpload)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: showFileList,
  })

  const determineContentType = (file: File): string => {
    if (isGLB(file)) {
      return 'model/gltf-binary'
    }
    const mimeType = file.type
    if (
      isVideo({ mimeType }) ||
      isAudio({ mimeType }) ||
      isImage({ mimeType })
    ) {
      return mimeType
    }
    return mimeType 
  }
  const uploadAndProcessFile = async (file: File) => {
    const uploadedFileName = file.name || 'unnamed'
    const contentType = determineContentType(file)
    const uploadedFileCid = await uploadFile({ filesToUpload: [file] })
    let pubUri

    if (
      isVideo({ mimeType: contentType }) ||
      isAudio({ mimeType: contentType }) ||
      isGLB(file)
    ) {
      pubUri = await uploadBlob({
        dataToUpload: {
          name: uploadedFileName,
          description: 'What did you think this was going to be?',
          image: '',
          animationUri: uploadedFileCid,
        },
      })
    } else {
      pubUri = await uploadBlob({
        dataToUpload: {
          name: uploadedFileName,
          description: 'What did you think this was going to be?',
          image: uploadedFileCid,
          animationUri: '',
        },
      })
    }
    await sendToDb({
      key: pubUri,
      value: {
        name: uploadedFileName,
        description: 'What did you think this was going to be?',
        image: isImage({ mimeType: contentType }) ? uploadedFileCid : '',
        animationUri: isImage({ mimeType: contentType }) ? '' : uploadedFileCid,
        contentType: contentType,
      },
    } as DataObject)

    if (signMessage && targetUserId !== undefined) {
      await processCreatePubPost({
        pubUri: pubUri,
        targetChannelId: BigInt(params.id as string),
        targetUserId: BigInt(targetUserId),
        privySignMessage: signMessage,
      })
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <form
              id="newUpload"
              className="focus:outline-none text-center h-full w-full"
              action={async () => {
                if (!targetUserId || filesToUpload.length === 0) return
                await Promise.all(filesToUpload.map(uploadAndProcessFile))
                setDialogOpen(false)
                filesToUpload.forEach((file, index) => {
                  toast.custom((t) => (
                    <Toast key={index}>
                      {'Successfully uploaded '}
                      <span className="font-bold">{file.name}</span>
                    </Toast>
                  ))
                })
              }}
              {...getRootProps()}
            >
              <Stack className="gap-[132px]">
                <Separator />
                {!showFileList ? (
                  <>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography className="text-secondary-foreground min-h-[35px]'">
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
                  <FileList filesToUpload={filesToUpload} />
                )}
                <Separator />
              </Stack>
              <DialogFooter className="pt-4">
                <Button
                  form="newUpload"
                  type="submit"
                  variant="link"
                  disabled={!targetUserId || !showFileList}
                >
                  <Typography>Confirm</Typography>
                </Button>
              </DialogFooter>
            </form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
