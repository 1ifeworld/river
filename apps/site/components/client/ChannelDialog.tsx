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
  DialogClose,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  FormMessage,
  Toast,
  Textarea,
} from '@/design-system'
import {
  uploadBlob,
  processCreateChannelPost,
  type DataObject,
  sendToDb,
  newChannelSchema,
  uploadFile,
} from '@/lib'
import { useUserContext } from '@/context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {} from '@/lib'
import { useDropzone } from 'react-dropzone'
import { FileList } from '@/server'
import * as z from 'zod'

interface ChannelDialogProps {
  authenticated: boolean
  login: () => void
}

export function ChannelDialog({ authenticated, login }: ChannelDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { signMessage, userId: targetUserId } = useUserContext()

  const [showOptionalDetails, setShowOptionalDetails] = React.useState(false)

  /**
   * Dropzone hooks
   */
  const [showFileList, setShowFileList] = React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
  const onDrop = React.useCallback((filesToUpload: File[]) => {
    setShowFileList(true)
    setFilesToUpload(filesToUpload)
  }, [])
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    // disabled: filesToUpload.length !== 0,
  })

  const form = useForm<z.infer<typeof newChannelSchema>>({
    resolver: zodResolver(newChannelSchema),
    defaultValues: {
      name: '',
      description: '',
      cover: undefined,
    },
  })

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <Button variant="link" onClick={login}>
          New channel
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button variant="link">New channel</Button>
        </DialogTrigger>
      )}
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader>
              <DialogTitle>
                <Typography>New channel</Typography>
              </DialogTitle>
            </DialogHeader>
            <DialogClose asChild className="absolute right-4 top-8">
              <Button variant="link">
                <Typography>close</Typography>
              </Button>
            </DialogClose>
            {/* Channel form */}
            <Form {...form}>
              <form
                id="newChannel"
                className="flex flex-col justify-center w-full gap-6"
                action={async () => {
                  // Prevent non-authenticated users from proceeding
                  if (!targetUserId) return
                  // Upload cover image to IPFS if it one was provided
                  let uploadedFileCid
                  let uploadedFileType
                  console.log('files to upload', filesToUpload)
                  if (filesToUpload.length !== 0) {
                    uploadedFileCid = await uploadFile({ filesToUpload })
                    uploadedFileType = filesToUpload[0].type
                  }
                  // Create an IPFS pointer containing the name of the channel
                  const channelUri = await uploadBlob({
                    dataToUpload: {
                      name: form.getValues().name,
                      description: form.getValues().description || '',
                      image: uploadedFileCid || '',
                      animationUri: '',
                    },
                  })
                  await sendToDb({
                    key: channelUri,
                    value: {
                      name: form.getValues().name,
                      description: form.getValues().description || '',
                      image: uploadedFileCid || '',
                      animationUri: '',
                      contentType: uploadedFileType,
                    },
                  } as DataObject)
                  // Generate create channel post for user and post transaction
                  if (signMessage) {
                    await processCreateChannelPost({
                      channelUri: channelUri,
                      targetUserId: targetUserId,
                      privySignMessage: signMessage,
                    })
                  }
                  setDialogOpen(false)
                  // Render a toast with the name of the channel
                  toast.custom((t) => (
                    <Toast>
                      {'Successfully created '}
                      <span className="font-bold">{form.getValues().name}</span>
                    </Toast>
                  ))
                }}
              >
                <Separator />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mx-5">
                      {showOptionalDetails && (
                        <FormLabel htmlFor="name">
                          <Typography variant="small">Name</Typography>
                        </FormLabel>
                      )}
                      <FormControl>
                        <Input
                          placeholder="Enter channel name..."
                          id="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {showOptionalDetails ? (
                  <>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="mx-5">
                          <FormLabel htmlFor="description">
                            <Typography variant="small">Description</Typography>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write a description..."
                              id="description"
                              className="resize-none"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Dropzone */}
                    <div className="mx-5" {...getRootProps()}>
                      <FormLabel htmlFor="cover">
                        <Typography variant="small">Cover</Typography>
                      </FormLabel>
                      {!showFileList ? (
                        <div className="border border-input bg-transparent text-center px-3 py-2">
                          <input id="cover" {...getInputProps()} />

                          {isDragActive ? (
                            <Typography className="text-muted-foreground min-h-[35px]'">
                              Drop your files here
                            </Typography>
                          ) : (
                            <Typography className="hover:cursor-pointer text-muted-foreground leading-1">
                              Drag and drop a cover image here or
                              {'\u00A0'}
                              <span className="underline">browse</span>
                              {'\u00A0'}your local file system
                            </Typography>
                          )}
                        </div>
                      ) : (
                        <Stack className="border border-input bg-transparent items-center text-center px-3 py-2">
                          <FileList filesToUpload={filesToUpload} />
                        </Stack>
                      )}
                    </div>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowOptionalDetails(true)}
                  >
                    <Typography>Add a cover image or description</Typography>
                  </Button>
                )}
                <Separator />
                <DialogFooter className="flex flex-col py-2">
                  <Button
                    form="newChannel"
                    type="submit"
                    variant="link"
                    disabled={!targetUserId}
                  >
                    <Typography>Create</Typography>
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
