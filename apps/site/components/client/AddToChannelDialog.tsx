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
  processBatchMoveItemPost,
  sendToDb,
  w3sUpload,
} from '@/lib'
import {
  getAllChannelsWithRid,
  type Channel,
  type Item,
  getChannelsForItem,
} from '@/gql'
import { zodResolver } from '@hookform/resolvers/zod'
import { revalidatePath } from 'next/cache'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { Hex } from 'viem'
import { usePrivy } from '@privy-io/react-auth'
import { AddToChannelFetcher } from '@/server'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type AddToChannelDialogProps = {
  item: Item
  dialogContent: React.ReactNode
}

export function AddToChannelDialog({
  item,
  dialogContent,
}: AddToChannelDialogProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { login, authenticated } = usePrivy()

  const { signMessage, userId: targetUserId, embeddedWallet } = useUserContext()

  //   const [roles, setRoles] = useState<Roles[]>([])
  //   const [ridChannels, setRidChannels] = React.useState<{ name: string; id: string; }[] | undefined>([])
  const [ridChannels, setRidChannels] = React.useState<any[]>([])

  console.log('rid channels: ', ridChannels)
  //   console.log('a name: ', ridChannels?.[0]?.channel?.name)

  //   interface ChannelWithTag extends Channel {
  //     containsItem: boolean
  //   }

  // React.useEffect(() => {
  //   const fetchRidChannels = async () => {
  //     try {
  //       const { channels } = await getAllChannelsWithRid({
  //         userId: targetUserId as bigint,
  //       })
  //       // TODO: add once fix codegen
  //       const { channels: channelsForItem } = await getChannelsForItem({
  //         id: item.id,
  //       })

  //       // console.log("channels: ", channels)

  //       if (!channels?.items) return

  //       const channelsWithTag = channels?.items.map((channel) => {
  //         const contains = channelsForItem?.items?.some(
  //           (c) => channel.channel.id == c.channel.id,
  //         )
  //         console.log(`${channel.channel.name} contains item: `, contains)

  //         return {
  //           channel: channel.channel,
  //           // TODO: add once fix codegen
  //           containsItem: channelsForItem?.items?.some(
  //             (c) => channel.channel.id === c.channel.id,
  //           ),
  //           // containsItem: false
  //         }
  //       })

  //       console.log('Channels with Tag: ', channelsWithTag)

  //       if (channels?.items) {
  //         setRidChannels(channelsWithTag)
  //       }

  //       // TODO: add in any relevant sorting
  //       // // Sort the startingRoles array based on startingRole in descending order
  //       // startingRoles.sort(
  //       //   (a, b) => Number(a.startingRole) - Number(b.startingRole),
  //       // )
  //     } catch (error) {
  //       console.error('Error setting channels:', error)
  //     }
  //   }

  //   if (targetUserId) {
  //     fetchRidChannels()
  //   }
  // }, [targetUserId])

  function flipContainsItem(channelId: any) {
    setRidChannels((prevChannels) =>
      prevChannels.map((c) => {
        if (c.channel.id === channelId) {
          // Check if newContainsItem already exists
          if (c.hasOwnProperty('newContainsItem')) {
            // Toggle the existing value of newContainsItem
            return { ...c, newContainsItem: !c.newContainsItem }
          } else {
            // If newContainsItem doesn't exist, create it with the opposite value of containsItem
            console.log('flipping new contains item')
            return { ...c, newContainsItem: !c.containsItem }
          }
        } else {
          return c
        }
      }),
    )
  }

  function getStateDiff(channels: any[]): any[] {
    return channels
      .filter((channel) => {
        if (
          channel.hasOwnProperty('newContainsItem') &&
          channel.newContainsItem !== channel.containsItem
        ) {
          return true // include the channel in the result array
        }
        return false // exclude the channel from the result array
      })
      .map((channel) => ({
        channelId: channel.channel.id,
        action: channel.newContainsItem ? 1 : 0, // 1 == add, 0 = remove
      }))
  }

  const channelsStateDif: any[] = getStateDiff(ridChannels)
  console.log('channels state dif: ', channelsStateDif)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <Button variant="outline" onClick={login}>
          <Typography>Add to channel</Typography>
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              if (typeof targetUserId !== 'undefined') {
                router.push(
                  `${pathname}?${createQueryString(
                    'rid',
                    targetUserId.toString(),
                  )}`,
                )
              }
            }}
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
              {dialogContent}
              {ridChannels?.map((channel, index) => (
                /* 
                        TODO
                        replace this Flex comp with a custom component that
                        wraps an updated channel card, with a button that lets u
                        update state of the channels we want to add item to
                    */
                <Flex className="w-full border-2 justify-between items-center">
                  <Typography>{channel?.channel.name}</Typography>
                  <Checkbox
                    checked={
                      channel.newContainsItem
                        ? true
                        : channel.containsItem &&
                            (!channel.hasOwnProperty('newContainsItem') ||
                              channel.newContainsItem)
                          ? true
                          : false
                    }
                    onClick={() => flipContainsItem(channel.channel.id)}
                    className="mr-2"
                  />
                </Flex>
              ))}
            </Stack>
            <Separator />
            <DialogFooter className="flex flex-col py-2">
              <Button
                variant="link"
                // TODO: replace onclick with a processAddItemToChannels call
                //       that adds target item to as many channels as desired
                disabled={channelsStateDif.length == 0 ? true : false}
                onClick={async () => {
                  if (!embeddedWallet?.address || !targetUserId) return false
                  setIsSubmitting(true)
                  // Initialize bool for txn success check
                  let txSuccess = false
                  // Generate process roles post
                  if (signMessage) {
                    txSuccess = await processBatchMoveItemPost({
                      rid: targetUserId,
                      signer: embeddedWallet.address as Hex,
                      privySignMessage: signMessage,
                      itemId: item.id,
                      diffs: channelsStateDif,
                    })
                    if (txSuccess) {
                      toast.custom((t) => (
                        <Toast>{'Items moved successfully'}</Toast>
                      ))
                      setIsSubmitting(false)
                    } else {
                      toast.custom((t) => <Toast>{'Error moving items'}</Toast>)
                      setIsSubmitting(false)
                    }
                  }
                }}
              >
                <Typography>Save</Typography>
              </Button>
            </DialogFooter>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
