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

const ChannelNameSchema = z.object({
  channelName: z.string().min(2, {
    message: 'Channel name must be at least 2 characters.',
  }),
})

export function ChannelDialog() {
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
      <DialogTrigger asChild>
        <Button variant="link">New channel</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader>
              <DialogTitle>
                <Typography>New channel</Typography>
              </DialogTitle>
            </DialogHeader>
            <Separator />
            {/* Channel form */}
            <Form {...form}>
              <form
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
                    },
                  })
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
                className="w-2/3 space-y-6"
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

                <Button type="submit" variant="link" disabled={!targetUserId}>
                  Create
                </Button>
              </form>
            </Form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
