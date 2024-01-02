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
  isText,
  isGLB,
  isPdf,
  isVideo,
  isAudio,
  IPFSDataObject,
  determineContentType,
} from '@/lib'
import { useUserContext } from '@/context'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { SubmitButton } from '@/client'
import { useParams } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { muxClient } from '@/config/muxClient'
import { FileList } from '@/server'
import { X } from 'lucide-react'
import { uploadToMux } from '@/lib'

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { authenticated, login } = usePrivy()
  const [showFileList, setShowFileList] = React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")
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
    const uploadedFileCid = await uploadFile({ filesToUpload: [file] })

    let pubUri: string
    let dataForDB: DataObject
    let contentTypeKey: number

    contentTypeKey =
      isVideo({ mimeType: contentType }) || isAudio({ mimeType: contentType })
        ? 2
        : isPdf({ mimeType: contentType }) || isGLB(file) || isText(file)
        ? 1
        : 0

    const animationUri =
      contentTypeKey === 2 || contentTypeKey === 1 ? uploadedFileCid : ''
    const imageUri = contentTypeKey === 0 ? uploadedFileCid : ''

    const ipfsDataObject: IPFSDataObject = {
      name: uploadedFileName,
      description: 'Dynamic metadata based on timestamp',
      image: imageUri,
      animationUri: animationUri,
    }

    pubUri = await uploadBlob({ dataToUpload: ipfsDataObject })

    let muxAssetId = ''
    let muxPlaybackId = ''

    if (contentTypeKey === 2) {
      const muxUploadResult = await uploadToMux(contentType, animationUri)
      muxAssetId = muxUploadResult.muxAssetId
      muxPlaybackId = muxUploadResult.muxPlaybackId
    }

    dataForDB = {
      key: pubUri,
      value: {
        ...ipfsDataObject,
        contentType: contentType,
        muxAssetId: muxAssetId,
        muxPlaybackId: muxPlaybackId,
      },
    }

    await sendToDb(dataForDB)

    if (signMessage && targetUserId) {
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
                setIsSubmitting(true)
                setSubmitError("") 
                try {
                  await Promise.all(filesToUpload.map(uploadAndProcessFile))
                  
                  // Success toast for each file
                  filesToUpload.forEach((file, index) => {
                    toast.custom((t) => (
                      <Toast key={index}>
                        {'Successfully uploaded '}
                        <span className="font-bold">{file.name}</span>
                      </Toast>
                    ));
                  });
                } catch (error) {
                  console.error("Error during file upload:", error)
                  // Error toast
                  toast.custom((t) => (
                    <Toast>
                      {'Error uploading files. Please try again.'}
                    </Toast>
                  ));
                } finally {
                  resetUploadState()
                  setDialogOpen(false)
                  setIsSubmitting(false)

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
                  disabled={!targetUserId || filesToUpload.length === 0 || isSubmitting}
                  >
                    {isSubmitting ? "Uploading..." : "Confirm"}
                </SubmitButton>
              </DialogFooter>
            </form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
