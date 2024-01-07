import { SubmitButton } from '@/client'
import { useUserContext } from '@/context'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Separator,
  Stack,
  Toast,
  Typography,
} from '@/design-system'
import { useWeb3Storage } from '@/hooks'
import {
  determineContentType,
  isAudio,
  isGLB,
  isPdf,
  isText,
  isVideo,
  processCreatePubPost,
  sendToDb,
} from '@/lib'
import { type MetadataObject, uploadToMux } from '@/lib'
import { usePrivy } from '@privy-io/react-auth'
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { authenticated, login } = usePrivy()
  const [showFileList, setShowFileList] = React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      // Taking only the first file if no file has been uploaded yet
      if (filesToUpload.length === 0 && acceptedFiles.length > 0) {
        setShowFileList(true)
        setFilesToUpload([acceptedFiles[0]])
      }
    },
    [filesToUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: filesToUpload.length > 0, // Disable dropzone if a file is already uploaded
  })

  const { client } = useWeb3Storage()

  const handleRemoveFile = (index: number) => {
    setFilesToUpload((currentFiles) =>
      currentFiles.filter((_, i) => i !== index),
    )
    setShowFileList(false)
  }

  const resetUploadState = () => {
    setFilesToUpload([])
    setShowFileList(false)
  }

  const uploadAndProcessFile = async (file: File) => {
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
      new Blob([JSON.stringify(metadataObject)], { type: 'application/json' }),
    )

    let muxAssetId = ''
    let muxPlaybackId = ''

    if (contentTypeKey === 2) {
      const muxUploadResult = await uploadToMux(
        contentType,
        animationUri?.toString() as string,
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
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <div>
          <Button variant="link" onClick={login}>
            +&nbsp;Item
          </Button>
        </div>
      ) : (
        <div>
          <DialogTrigger asChild>
            <Button variant="link">+&nbsp;Item</Button>
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
                for (const [index, file] of filesToUpload.entries()) {
                  toast.custom((t) => (
                    <Toast key={index}>
                      {'Successfully uploaded '}
                      <span className="font-bold">{file.name}</span>
                    </Toast>
                  ))
                  resetUploadState()
                }
              }}
              {...getRootProps()}
            >
              <Stack className="gap-[132px]">
                <Separator />
                {filesToUpload.length === 0 ? (
                  <>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography className="text-muted-foreground min-h-[35px]'">
                        Drop your files here
                      </Typography>
                    ) : (
                      <Typography className="hover:cursor-pointer text-muted-foreground leading-1">
                        Drag and drop your file here <br /> or click here to{' '}
                        <span className="underline underline-offset-2">
                          browse
                        </span>
                      </Typography>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between p-2 rounded-lg">
                    <div className="flex-1 truncate pr-4">
                      <span
                        className="text-sm font-medium text-gray-700"
                        title={filesToUpload[0].name}
                      >
                        {filesToUpload[0].name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(0)}
                      className="ml-2 flex-shrink-0 text-black-500 hover:bg-red-100 rounded-full p-1"
                      aria-label="Remove file"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <Separator />
              </Stack>
              <DialogFooter className="pt-4">
                <SubmitButton
                  form="newUpload"
                  type="submit"
                  variant="link"
                  disabled={!targetUserId || filesToUpload.length === 0}
                >
                  Confirm
                </SubmitButton>
              </DialogFooter>
            </form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
