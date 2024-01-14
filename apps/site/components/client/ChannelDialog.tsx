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
import { w3sUpload } from "@/lib"
import {
  type MetadataObject,
  newChannelSchema,
  processCreateChannelPost,
  ACCEPTED_IMAGE_MIME_TYPES,
  CHANNEL_MAX_FILE_SIZE,
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
    console.log("Accepted files:", acceptedFiles.map(file => ({ name: file.name, size: file.size })));
    setShowFileList(true);
    setFilesToUpload(acceptedFiles);
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
    maxSize: 5 * 1024 * 1024,
    accept: ACCEPTED_IMAGE_MIME_TYPES,
  })

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
    let uploadedFileCid;
    let uploadedFileType;
    if (filesToUpload.length !== 0) {
      const coverFormData = new FormData();
      coverFormData.append('file', filesToUpload[0]);
      const {cid} = await w3sUpload(coverFormData);
      uploadedFileCid = cid;
      uploadedFileType = filesToUpload[0].type;
    }

    // Use formData directly instead of form.getValues()
    const metadataObject: MetadataObject = {
      name: formData.name,
      description: formData.description || "",
      image: uploadedFileCid || "",
      animationUri: "",
    };

    const metadataFormData = new FormData();
    const metadataBlob = new Blob([JSON.stringify(metadataObject)], { type: "application/json" });
    metadataFormData.append('file', metadataBlob);
  
    const { cid: channelCid } = await w3sUpload(metadataFormData);

    // Save the channel data to the database
    await sendToDb({
      key: channelCid,
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
        channelUri: channelCid,
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

  const onInvalidSubmit = (errors: FieldErrors<z.infer<typeof newChannelSchema>>) => {
    console.error("Form validation errors:", errors);
    toast.custom((t) => (
      <Toast>{"Please fix your form errors"}</Toast>
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