import * as React from "react"
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
  Debug,
} from "@/design-system"
import {
  uploadBlob,
  processCreateChannelPost,
  type DataObject,
  sendToDb,
  newChannelSchema,
  uploadFile,
} from "@/lib"
import { useUserContext } from "@/context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { SubmitButton } from "@/client"
import { useDropzone } from "react-dropzone"
import { FileList } from "@/server"
import * as z from "zod"

interface ChannelDialogProps {
  authenticated: boolean
  login: () => void
}

export function ChannelDialog({ authenticated, login }: ChannelDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const {
    signMessage,
    userId: targetUserId,
    embeddedWallet,
  } = useUserContext()

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
    disabled: filesToUpload.length !== 0,
  })

  const form = useForm<z.infer<typeof newChannelSchema>>({
    resolver: zodResolver(newChannelSchema),
    defaultValues: {
      name: "",
      description: "",
      cover: undefined,
    },
  })

  const resetFormAndFiles = () => {
    form.reset()
    setFilesToUpload([])
    setShowFileList(false)
  }

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <Button variant="link" onClick={login}>
          +&nbspChannel
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button variant="link">+&nbspChannel</Button>
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
                  if (!targetUserId || isSubmitting) return
                  setIsSubmitting(true)
                  setSubmitError("") // clear previous message

                  // Upload cover image to IPFS if it one was provided
                  try {
                    let uploadedFileCid
                    let uploadedFileType
                    console.log("files to upload", filesToUpload)
                    if (filesToUpload.length !== 0) {
                      uploadedFileCid = await uploadFile({ filesToUpload })
                      uploadedFileType = filesToUpload[0].type
                    }
                    // Create an IPFS pointer containing the name of the channel
                    const channelUri = await uploadBlob({
                      dataToUpload: {
                        name: form.getValues().name,
                        description: form.getValues().description || "",
                        image: uploadedFileCid || "",
                        animationUri: "",
                      },
                    })
                    await sendToDb({
                      key: channelUri,
                      value: {
                        name: form.getValues().name,
                        description: form.getValues().description || "",
                        image: uploadedFileCid || "",
                        animationUri: "",
                        contentType: uploadedFileType,
                      },
                    } as DataObject)
                    // Generate create channel post for user and post transaction
                    if (signMessage) {
                      await processCreateChannelPost({
                        channelUri: channelUri,
                        targetUserId: targetUserId,
                        privySignerAddress: embeddedWallet?.address as string,
                        privySignMessage: signMessage,
                      })
                    }
                    setDialogOpen(false)
                    // Render a toast with the name of the channel
                    toast.custom((t) => (
                      <Toast>
                        {"Successfully created "}
                        <span className="font-bold">
                          {form.getValues().name}
                        </span>
                      </Toast>
                    ))
                    resetFormAndFiles()
                    setDialogOpen(false)
                  } catch (error) {
                    console.error("Error creating channel:", error)
                    toast.custom((t) => (
                      <Toast>
                        {"Failed to create channel. Please try again."}
                      </Toast>
                    ))
                    setSubmitError("Failed to create channel. Please try again.")
                  } finally {
                    setIsSubmitting(false)
                  }
                }}                
              >
                {/* Display submission error, if any */}
                {submitError && (
                  <Typography variant="small" color="error">
                    {submitError}
                  </Typography>
                )}

                <Separator />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mx-5">
                      <FormLabel htmlFor="name">
                        <Typography variant="small">Name</Typography>
                      </FormLabel>
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
                    <div className="border border-border bg-transparent text-center px-3 py-1">
                      <input id="cover" {...getInputProps()} />
                      {isDragActive ? (
                        <Typography
                          variant="small"
                          className="text-muted-foreground min-h-[35px] tracking-normal"
                        >
                          Drop your files here
                        </Typography>
                      ) : (
                        <Typography
                          variant="small"
                          className="hover:cursor-pointer text-muted-foreground tracking-normal"
                        >
                          Drag and drop a cover image here or
                          {"\u00A0"}
                          <span className="underline underline-offset-2">
                            browse
                          </span>
                          {"\u00A0"}your local file system
                        </Typography>
                      )}
                    </div>
                  ) : (
                    <Stack className="border border-border bg-transparent items-center text-center px-3 py-2">
                      <FileList filesToUpload={filesToUpload} />
                    </Stack>
                  )}
                </div>
                <Separator />
                <DialogFooter className="flex flex-col py-2">
                  <SubmitButton
                    form="newChannel"
                    type="submit"
                    variant="link"
                    disabled={!targetUserId || isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </SubmitButton>
                </DialogFooter>
              </form>
            </Form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
