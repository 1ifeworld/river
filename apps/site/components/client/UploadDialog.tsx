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
import { uploadFile, uploadBlob } from '@/lib'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { processCreatePubAndAddItemPost } from '@/lib'
import { useParams } from 'next/navigation'
import { useUserContext } from '@/context'
import { isVideo, sendToDb } from '@/lib'
import { DataObject } from '@/lib'

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
    filesToUpload.forEach((file) => {
      console.log(`File Name: ${file.name} MIME type: ${file.type}`)
    })
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
                  // const imageCid = await uploadFile({ filesToUpload })
                  const pubUri = await uploadBlob({
                    dataToUpload: {
                      name: filesToUpload[0]?.name || 'unnamed',
                      description: 'What did you think this was going to be?',
                      image: await uploadFile({ filesToUpload }),
                      // content_type: filesToUpload[0].type,
                      // animation_url: ""
                    }
                  })


                  // const pubUri = await uploadBlob({
                  //   dataToUpload: {
                  //     name: filesToUpload[0]?.name || 'unnamed',
                  //     description: 'What did you think this was going to be?',
                  //     image: await uploadFile({ filesToUpload }),
                  //   },
                  // })


                  // const imageUploadUrl = await uploadFile({ filesToUpload: [filesToUpload[0]] })
                  // let animationUploadUrl = null

                  // console.log("imageUploadUrl", imageUploadUrl)

                  // if (isVideo(filesToUpload[0].type)) {
                  //   animationUploadUrl = await uploadFile({ filesToUpload: [filesToUpload[0]] })
                  //   console.log("imageUploadUrl", animationUploadUrl)
                  // }

                  const fileMime = filesToUpload[0].type
                  const fileName = filesToUpload[0].name

                  // await sendToDb(pubUri, fileName, fileMime, imageCid)
                  // Update the sendToDb call to match the DataObject interface
                  await sendToDb({
                    key: pubUri,
                    value: {
                      name: fileName,
                      description: '',
                      image: 'ipfs://bafkreiamfxbkndyuwkw4kutjcfcitozbtzrvqneryab2njltiopsfjwt6a',
                      animationUri: '',
                      contentType: fileMime,
                    },
                  } as DataObject)

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
