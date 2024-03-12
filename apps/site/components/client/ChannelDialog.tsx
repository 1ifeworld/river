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
  Loading,
  Separator,
  Stack,
  Textarea,
  Toast,
  Typography,
} from '@/design-system'
import {
  type NewChannelSchemaValues,
  newChannelSchema,
  processCreateChannelPost,
  sendToDb,
  w3sUpload,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { revalidatePath } from 'next/cache'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { Hex } from 'viem'

interface ChannelDialogProps {
  authenticated: boolean
  login: () => void
}

export function ChannelDialog({ authenticated, login }: ChannelDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { signMessage, userId: targetUserId, embeddedWallet } = useUserContext()

  const form = useForm<NewChannelSchemaValues>({
    resolver: zodResolver(newChannelSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function createNewChannel(data: NewChannelSchemaValues) {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description as string)

    // Prevent non-authenticated users from proceeding
    if (!targetUserId) return
    // Initialize bool for txn success check
    let txSuccess = false
    // Generate create channel post for user and post transaction
    if (signMessage && embeddedWallet) {
      txSuccess = await processCreateChannelPost({
        signer: embeddedWallet.address as Hex,
        name: data.name,
        description: data.description || '',
        rid: targetUserId,
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
          <Typography>+&nbsp;Channel</Typography>
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button variant="link">
            <Typography>+&nbsp;Channel</Typography>
          </Button>
        </DialogTrigger>
      )}
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader className="flex w-full px-5 justify-between items-center">
              <div className="flex-1">{/* Placholder */}</div>
              <DialogTitle className="flex-1 text-center">
                <Typography>New channel</Typography>
              </DialogTitle>
              <DialogClose asChild className="flex-1 justify-end">
                <Button variant="link">
                  <Typography>close</Typography>
                </Button>
              </DialogClose>
            </DialogHeader>
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
                      <FormMessage className="pt-2 text-red-500" />
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
                      <FormMessage className="pt-2 text-red-500" />
                    </FormItem>
                  )}
                />
                <Separator />
                <DialogFooter className="flex flex-col py-2">
                  <Button
                    form="newChannel"
                    type="submit"
                    variant="link"
                    disabled={!targetUserId || isSubmitting}
                  >
                    {isSubmitting ? <Loading /> : 'Create'}
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
