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
  isPdf,
  isVideo,
  isAudio,
  IPFSDataObject,
  determineContentType,
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

  const uploadAndProcessFile = async (file: File) => {
    const uploadedFileName = file.name || 'unnamed'
    const contentType = determineContentType(file)
    const uploadedFileCid = await uploadFile({ filesToUpload: [file] })

    let pubUri: string
    let dataForDB: DataObject

    // Set the correct animationUri based on file type
    const reqAnimationUri =
      isVideo({ mimeType: contentType }) ||
      isAudio({ mimeType: contentType }) ||
      isPdf({ mimeType: contentType }) ||
      isGLB(file)
    const animationUri = reqAnimationUri ? uploadedFileCid : ''

    const ipfsDataObject: IPFSDataObject = {
      name: uploadedFileName,
      description: 'What did you think this was going to be?',
      image: isImage({ mimeType: contentType }) ? uploadedFileCid : '',
      animationUri: animationUri,
    }

    pubUri = await uploadBlob({ dataToUpload: ipfsDataObject })

    if (
      isVideo({ mimeType: contentType }) ||
      isAudio({ mimeType: contentType })
    ) {
      const assetEndpointForMux = pinataUrlFromCid({
        cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid }),
      })
      const muxAsset = await muxClient.Video.Assets.create({
        input: assetEndpointForMux,
        playback_policy: 'public',
        ...(isVideo({ mimeType: contentType }) && {
          encoding_tier: 'baseline',
        }),
      })

      const muxAssetId = muxAsset.id || ''
      const muxPlaybackId =
        muxAsset.playback_ids && muxAsset.playback_ids[0]
          ? muxAsset.playback_ids[0].id
          : ''

      dataForDB = {
        key: pubUri,
        value: {
          ...ipfsDataObject,
          contentType: contentType,
          muxAssetId: muxAssetId,
          muxPlaybackId: muxPlaybackId,
        },
      }
    } else {
      dataForDB = {
        key: pubUri,
        value: {
          ...ipfsDataObject,
          contentType: contentType,
          muxAssetId: '',
          muxPlaybackId: '',
        },
      }
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
            + Add
          </Button>
        </div>
      ) : (
        <div>
          <DialogTrigger asChild>
            <Button variant="link">+ Add</Button>
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
