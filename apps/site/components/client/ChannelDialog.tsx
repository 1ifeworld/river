import { SubmitButton } from "@/client"
import { useUserContext } from "@/context"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Stack,
  Textarea,
  Toast,
  Typography,
} from "@/design-system"
import { useWeb3Storage } from "@/hooks"
import {
  type MetadataObject,
  newChannelSchema,
  processCreateChannelPost,
  ACCEPTED_IMAGE_MIME_TYPES,
  MAX_FILE_SIZE,
  sendToDb,
} from "@/lib"
import { FileList } from "@/server"
import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useDropzone, FileRejection, DropEvent} from "react-dropzone"
import { useForm, FieldErrors } from "react-hook-form"
import { toast } from "sonner"
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

  const onDropValidated = React.useCallback((acceptedFiles: File[]) => {
    setShowFileList(true)
    setFilesToUpload(acceptedFiles)
  }, [])

  const onDropRejected = React.useCallback(() => {
    toast.custom(() => (
      <Toast>
     <span className="font-bold">
        {"Only image files are accepted."}
        </span>
      </Toast>
    ))
    setShowFileList(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropValidated,
    onDropRejected,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_IMAGE_MIME_TYPES,
  })

  const { client } = useWeb3Storage()

  const form = useForm<z.infer<typeof newChannelSchema>>({
    resolver: zodResolver(newChannelSchema),
    defaultValues: {
      name: "",
      description: "",
      cover: undefined,
    },
  })

  const onValidSubmit = async (formData: z.infer<typeof newChannelSchema>) => {
    if (!targetUserId) return // Prevent non-authenticated users from proceeding

    // Upload cover image to IPFS if one was provided
    let uploadedFileCid
    let uploadedFileType
    if (filesToUpload.length !== 0) {
      uploadedFileCid = await client?.uploadFile(filesToUpload[0])
      uploadedFileType = filesToUpload[0].type
    }

    // Use formData directly instead of form.getValues()
    const metadataObject: MetadataObject = {
      name: formData.name,
      description: formData.description || "",
      image: uploadedFileCid?.toString() || "",
      animationUri: "",
    }

    const channelUri = await client?.uploadFile(
      new Blob([JSON.stringify(metadataObject)], {
        type: "application/json",
      })
    )

    // Save the channel data to the database
    await sendToDb({
      key: channelUri?.toString() as string,
      value: {
        name: formData.name,
        description: formData.description || "",
        image: (uploadedFileCid?.toString() as string) || "",
        animationUri: "",
        contentType: uploadedFileType as string,
      },
    })

    // Generate create channel post for user and post transaction
    if (signMessage) {
      await processCreateChannelPost({
        channelUri: channelUri?.toString() as string,
        targetUserId: targetUserId,
        privySignerAddress: embeddedWallet?.address as string,
        privySignMessage: signMessage,
      })
    }

    setDialogOpen(false) 
    toast.custom((t) => (
      <Toast>
        {"Successfully created "}
        <span className="font-bold">{formData.name}</span>
      </Toast>
    ))

    resetFormAndFiles() // Reset the form and file list
  }

  const onInvalidSubmit = (
    errors: FieldErrors<z.infer<typeof newChannelSchema>>
  ) => {
    // Handle form validation errors
    console.error("Form validation errors:", errors)
    // Provide feedback to the user, for instance using a toast
    toast.custom((t) => (
      <span className="font-bold">
      <Toast>{'Please fix your form errors'}</Toast>
      </span>
    ))
  }

  const formSubmitHandler = form.handleSubmit(onValidSubmit, onInvalidSubmit)

  const resetFormAndFiles = () => {
    form.reset()
    setFilesToUpload([])
    setShowFileList(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <Button variant="link" onClick={login}>
          +&nbsp;Channel
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button variant="link">+&nbsp;Channel</Button>
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
                onSubmit={formSubmitHandler}
              >
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
                    disabled={!targetUserId}
                  >
                    Create
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
