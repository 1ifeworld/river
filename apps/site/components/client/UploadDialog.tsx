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
import { uploadToMux } from '@/lib'

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
        // <div>
        //   <DialogTrigger asChild>
        //     <Button variant="link">+&nbsp;Item</Button>
        //   </DialogTrigger>
        // </div>

        <Flex className="gap-4 items-center">
    <Stack className="w-10 h-10 bg-background border border-border justify-center items-center hover:bg-primary/[0.025] transition-all">
      <Typography variant="h1">
      +
      </Typography>
      </Stack>
      <Button variant="link">
        Add an item
    </Button>
    </Flex>
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
                resetUploadState()
                setDialogOpen(false)
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
            >
              <Stack className="gap-[132px]">
                <Separator />
                {!showFileList ? (
                  <>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography className="text-muted-foreground min-h-[35px]'">
                        Drop your files here
                      </Typography>
                    ) : (
                      <Typography className="hover:cursor-pointer text-muted-foreground leading-1">
                        Drag and drop your files here <br /> or click here to{' '}
                        <span className="underline underline-offset-2">
                          browse
                        </span>
                      </Typography>
                    )}
                  </>
                ) : (
                  <FileList filesToUpload={filesToUpload} />
                )}
                <Separator />
              </Stack>
              <DialogFooter className="pt-4">
                <SubmitButton
                  form="newUpload"
                  type="submit"
                  variant="link"
                  disabled={!targetUserId || !showFileList}
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
