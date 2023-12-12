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
  Debug,
} from '@/design-system'
import { uploadFile, uploadBlob, processCreatePubAndAddItemPost } from '@/lib'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useUserContext } from '@/context'
import { usePrivy } from '@privy-io/react-auth'
import { DataObject, sendToDb } from '@/lib'
import Mux from '@mux/mux-node';
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'

function isImage({ mimeType }: { mimeType: string }) {
  return ['image/jpeg', 'image/png'].includes(mimeType)
}

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { authenticated, login } = usePrivy()

  /**
   * Dropzone hooks
   */
  const [showFileList, setShowFileList] = React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
  const onDrop = React.useCallback((filesToUpload: File[]) => {
    setShowFileList(true)
    setFilesToUpload(filesToUpload)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: showFileList,
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
            {/* Upload form */}
            <form
              id="newUpload"
              className="focus:outline-none text-center h-full w-full"
              action={async () => {
                // Prevent non-authenticated users from proceeding
                if (!targetUserId) return
                // Create an IPFS pointer for the uploaded item
                
                const uploadedFileName = filesToUpload[0]?.name || 'unnamed'
                const uploadedFileType = filesToUpload[0].type
                const hardcodedDescription =
                  'What did you think this was going to be?'
                // if image set image field, and leave animation blank
                // if not image, do opposite
                let pubUri
                console.log("what file type is it: ", uploadedFileType)
                if (isImage({ mimeType: uploadedFileType })) {
                  const uploadedFileCid = await uploadFile({ filesToUpload })
                  pubUri = await uploadBlob({
                    dataToUpload: {
                      name: uploadedFileName,
                      description: hardcodedDescription,
                      image: uploadedFileCid,
                      animationUri: '',
                    },
                  })
                  await sendToDb({
                    key: pubUri,
                    value: {
                      name: uploadedFileName,
                      description: hardcodedDescription,
                      image: uploadedFileCid,
                      animationUri: '',
                      contentType: uploadedFileType,
                    },
                  } as DataObject)
                } else {
                  console.log("are we entering the else statement")
                  // initialize mux api 
                  const { Video } = new Mux(
                    process.env.NEXT_PUBLIC_MUX_TOKEN_ID as string, 
                    process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET as string
                  );

                  console.log("video upload api initialkzed: ", Video)
                  //
                  const uploadedFileCid = await uploadFile({ filesToUpload })
                  // upload asset
                  const assetEndpointForMux = pinataUrlFromCid({ cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid })})
                  console.log("pinata endpoint for mux: ", assetEndpointForMux)
                  const asset = await Video.Assets.create({
                    input: assetEndpointForMux,
                    playback_policy: "public",
                    encoding_tier: "baseline"
                  });       
                  console.log("uploaded mux asset info", asset)

                  pubUri = await uploadBlob({
                    dataToUpload: {
                      name: uploadedFileName,
                      description: hardcodedDescription,
                      image: '',
                      animationUri: uploadedFileCid,
                    },
                  })          
                  
                  console.log("are we generating pub uri?")

                  await sendToDb({
                    key: pubUri,
                    value: {
                      name: uploadedFileName,
                      description: hardcodedDescription,
                      image: '',
                      animationUri: uploadedFileCid,
                      contentType: uploadedFileType,
                      muxAssetId: asset.source_asset_id,
                      muxPlaybackId: asset.playback_ids?.[0]?.id ?? ""
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

const FileList = ({ filesToUpload }: { filesToUpload: File[] }) => {
  return (
    <ul className="min-h-[35px]">
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
