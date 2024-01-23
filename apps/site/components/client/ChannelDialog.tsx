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
} from '@/design-system'
import {
  type MetadataObject,
  type NewChannelSchemaValues,
  newChannelSchema,
  processCreateChannelPost,
  sendToDb,
  w3sUpload,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface ChannelDialogProps {
  authenticated: boolean
  login: () => void
}

export function ChannelDialog({ authenticated, login }: ChannelDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { signMessage, userId: targetUserId, authToken } = useUserContext()

  const form = useForm<NewChannelSchemaValues>({
    resolver: zodResolver(newChannelSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function createNewChannel(data: NewChannelSchemaValues) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description as string)
    const verifying = await authToken
    const { cid } = await w3sUpload(formData, verifying)

    // Prevent non-authenticated users from proceeding
    if (!targetUserId) return

    const metadataObject: MetadataObject = {
      name: data.name,
      description: data.description || '',
      image: '',
      animationUri: '',
      contentType: '',
    }

    await sendToDb({
      key: cid,
      value: {
        ...metadataObject,
        // contentType: uploadedFileType as string,
      },
    })
    // Initialize bool for txn success check
    let txSuccess = false
    // Generate create channel post for user and post transaction
    if (signMessage) {
      txSuccess = await processCreateChannelPost({
        channelUri: cid,
        targetUserId: targetUserId,
        privySignMessage: signMessage,
      })
      setDialogOpen(false)
      if (txSuccess) {
        // Render a toast with the name of the channel
        toast.custom((t) => (
          <Toast>
            {'Successfully created '}
            <span className="font-bold">{data.name}</span>
          </Toast>
        ))
        // Reset form fields to their initial values
        form.reset()
      } else {
        // Render a toast with error message
        toast.custom((t) => <Toast>{'Error creating channel'}</Toast>)
      }
    }
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
            <Form {...form}>
              <form
                id="newChannel"
                className="flex flex-col justify-center w-full gap-6"
                onSubmit={form.handleSubmit(createNewChannel)}
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
