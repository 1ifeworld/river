import { useUserContext } from '@/context'
import {
  Button,
  Checkbox,
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
  Flex,
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
import { getAllChannelsWithRid, type Channel, type Item } from '@/gql'
import { zodResolver } from '@hookform/resolvers/zod'
import { revalidatePath } from 'next/cache'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { Hex } from 'viem'
import { usePrivy } from '@privy-io/react-auth'

type AddToChannelDialogProps = {
    item: Item
}

export function AddToChannelDialog({item}: AddToChannelDialogProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { login, authenticated } = usePrivy()

  const { signMessage, userId: targetUserId, embeddedWallet } = useUserContext()

  //   const [roles, setRoles] = useState<Roles[]>([])
  //   const [ridChannels, setRidChannels] = React.useState<{ name: string; id: string; }[] | undefined>([])
  const [ridChannels, setRidChannels] = React.useState<any[]>([])

  console.log('rid channels: ', ridChannels)
  console.log('a name: ', ridChannels?.[0]?.channel?.name)

  React.useEffect(() => {
    const fetchRidChannels = async () => {
      try {
        const { channels } = await getAllChannelsWithRid({
          userId: targetUserId as bigint,
        })

        // setRidChannels(channels.items)

        if (channels?.items) {
          setRidChannels(channels.items)
        }

        // // Sort the startingRoles array based on startingRole in descending order
        // startingRoles.sort(
        //   (a, b) => Number(a.startingRole) - Number(b.startingRole),
        // )
      } catch (error) {
        console.error('Error setting channels:', error)
      }
    }

    if (targetUserId) {
      fetchRidChannels()
    }
  }, [targetUserId])

  //   const form = useForm<NewChannelSchemaValues>({
  //     resolver: zodResolver(newChannelSchema),
  //     defaultValues: {
  //       name: '',
  //       description: '',
  //     },
  //   })

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <Button variant="outline" onClick={login}>
          <Typography>Add to channel</Typography>
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-[0px] shadow-none w-full hover:bg-transparent hover:border-secondary-foreground focus:border-secondary-foreground"
          >
            <Typography>Add to channel</Typography>
          </Button>
        </DialogTrigger>
      )}
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader className="px-5 flex w-full justify-between items-center">
              <DialogTitle className="flex-1 text-start">
                <Typography>Add to channel</Typography>
              </DialogTitle>
              <DialogClose asChild className="flex-1 justify-end">
                <Button variant="link">
                  <Typography>close</Typography>
                </Button>
              </DialogClose>
            </DialogHeader>
            <Separator />
            <Stack className="px-5 w-full max-h-[500px] overflow-y-auto">
              {ridChannels?.map((channel) => (
                /* 
                        TODO
                        replace this Flex comp with a custom component that
                        wraps an updated channel card, with a button that lets u
                        update state of the channels we want to add item to
                    */
                <Flex className="w-full border-2 justify-between items-center">
                  <Typography>{channel?.channel.name}</Typography>
                  <Checkbox  className='mr-2' />
                </Flex>
              ))}
            </Stack>
            <Separator />
            <DialogFooter className="flex flex-col py-2">
              <Button
                variant="link"
                // TODO: replace onclick with a processAddItemToChannels call
                //       that adds target item to as many channels as desired
                //
                // onClick={async () => {
                //   if (!embeddedWallet?.address || !userId) return false
                //   setIsConfiguring(true)
                //   // Initialize bool for txn success check
                //   let txSuccess = false
                //   // Generate process roles post
                //   if (signMessage) {
                //     txSuccess = await processEditRolesPost({
                //       rid: userId,
                //       signer: embeddedWallet.address as Hex,
                //       privySignMessage: signMessage,
                //       channelCid: channel.id,
                //       targetRids: [BigInt(0)], // USER_ID_ZERO
                //       roles: [BigInt(1)], // MEMBER
                //     })
                //     if (txSuccess) {
                //       toast.custom((t) => (
                //         <Toast>{'Your channel is now public'}</Toast>
                //       ))
                //       setIsConfiguring(false)
                //     } else {
                //       toast.custom((t) => (
                //         <Toast>{'Error making channel public'}</Toast>
                //       ))
                //       setIsConfiguring(false)
                //     }
                //   }
                // }}
              >
                <Typography>Save</Typography>
              </Button>

              {/* <Button
                form="newChannel"
                type="submit"
                variant="link"
                disabled={!targetUserId || isSubmitting}
                >
                {isSubmitting ? <Loading /> : 'Create'}
                </Button> */}
            </DialogFooter>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
