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
  DropdownMenuItem,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  Input,
  FormLabel,
  FormMessage,
} from '@/design-system'
import { type Hex } from 'viem'
import { getUserId, uploadBlob } from '@/lib'
import { createChannel } from '@/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAlchemyContext } from 'context/AlchemyProviderContext'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface ChannelDialogProps {
  triggerChildren: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
  userId: bigint
}

const ChannelNameSchema = z.object({
  channelName: z.string().min(2, {
    message: 'Channel name must be at least 2 characters.',
  }),
})

export const ChannelDialog = React.forwardRef<
  HTMLDivElement,
  ChannelDialogProps
>(({ triggerChildren, onSelect, onOpenChange, userId }, forwardedRef) => {

  const form = useForm<z.infer<typeof ChannelNameSchema>>({
    resolver: zodResolver(ChannelNameSchema),
    defaultValues: {
      channelName: '',
    },
  })

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          ref={forwardedRef}
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader>
              <DialogTitle>
                <Typography>Add New Item</Typography>
              </DialogTitle>
            </DialogHeader>
            <Separator />
            {/* Channel form */}
            <Form {...form}>
              <form
                action={async () => {
                  // Create an IPFS pointer containing the name of the channel
                  const channelUri = await uploadBlob({
                    dataToUpload: form.getValues().channelName,
                  })

                  await createChannel({
                    userId: userId as bigint,
                    adminIds: [userId as bigint],
                    memberIds: [],
                    channelUri: channelUri,
                  })

                  // Close the dialog after successfully completing the action
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
                <Button type="submit" variant="link">
                  Create
                </Button>
              </form>
            </Form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
})
