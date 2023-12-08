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
  Input,
  FormMessage,
  Toast,
} from '@/design-system'
import { uploadBlob, processCreateChannelPost } from '@/lib'
import { useUserContext } from '@/context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { DataObject, sendToDb } from '@/lib'

const ChannelNameSchema = z.object({
  channelName: z.string().min(2, {
    message: 'Channel name must be at least 2 characters.',
  }),
})

interface ChannelDialogProps {
  authenticated: boolean
  login: () => void
}

export function ChannelDialog({ authenticated, login }: ChannelDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { signMessage, userId: targetUserId } = useUserContext()

  const form = useForm<z.infer<typeof ChannelNameSchema>>({
    resolver: zodResolver(ChannelNameSchema),
    defaultValues: {
      channelName: '',
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
            <Separator />
            {/* Channel form */}
            <Form {...form}>
              <form
                id="newChannel"
                className="flex flex-col justify-center w-5/6 py-4"
                action={async () => {
                  // Prevent non-authenticated users from proceeding
                  if (!targetUserId) return
                  // Create an IPFS pointer containing the name of the channel
                  const channelUri = await uploadBlob({
                    dataToUpload: {
                      name: form.getValues().channelName,
                      description: 'This time its happening',
                      image:
                        // harcoded cover image uri
                        'ipfs://bafkreiamfxbkndyuwkw4kutjcfcitozbtzrvqneryab2njltiopsfjwt6a',
                      animationUri: ""
                    },
                  })
                  await sendToDb({
                    key: channelUri,
                    value: {
                      name: form.getValues().channelName,
                      description: 'This time its happening',
                      image: 'ipfs://bafkreiamfxbkndyuwkw4kutjcfcitozbtzrvqneryab2njltiopsfjwt6a',
                      animationUri: '',
                      contentType: 'image/jpeg',
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
                      <span className="font-bold">
                        {form.getValues().channelName}
                      </span>
                    </Toast>
                  ))
                }}
              >
                <FormField
                  control={form.control}
                  name="channelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter channel name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <Separator />
            <DialogFooter className="flex justify-center py-2">
              <Button
                form="newChannel"
                type="submit"
                variant="link"
                disabled={!targetUserId}
              >
                <Typography>Create</Typography>
              </Button>
            </DialogFooter>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
