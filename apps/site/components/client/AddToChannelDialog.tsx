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
  Loading,
  Separator,
  Stack,
  Flex,
  Toast,
  Typography,
} from '@/design-system'
import { processBatchMoveItemPost } from '@/lib'
import { type Item, getChannelsForItem } from '@/gql'
import * as React from 'react'
import { toast } from 'sonner'
import type { Hex } from 'viem'
import { usePrivy } from '@privy-io/react-auth'
import { ChannelCard2 } from '@/client'

export function AddToChannelDialog({ item }: { item: Item }) {
  const { login, authenticated } = usePrivy()
  const {
    signMessage,
    userId: targetUserId,
    embeddedWallet,
    userChannels,
  } = useUserContext()
  // biome-ignore lint:
  const [taggedChannels, setTaggedChannels] = React.useState<any[]>([])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    const tagChannels = async () => {
      try {
        // fetch channels item has been added to
        const { channels: channelsForItem } = await getChannelsForItem({
          id: item.id,
        })
        // if not added to any channels, return
        if (!channelsForItem?.items) return
        // update taggedChannels state by adding "contains item" value to each channel
        // userChannels is fed in via user contexst
        // @ts-ignore
        const processedChannels = userChannels?.map((channel, index) => {
          return {
            channel: channel.channel,
            channelItemMetadata: channel.channelItemMetadata,
            containsItem: channelsForItem?.items?.some(
              (c) => channel.channel.id === c.channel.id,
            ),
          }
        })
        // update taggedChannels state if processedChannels returned succcessfully
        if (processedChannels) setTaggedChannels(processedChannels)

        // TODO: add in any relevant sorting
        // // Sort the startingRoles array based on startingRole in descending order
        // startingRoles.sort(
        //   (a, b) => Number(a.startingRole) - Number(b.startingRole),
        // )
      } catch (error) {
        console.error('Error tagging channels:', error)
      }
    }

    if (userChannels) {
      tagChannels()
    }
  }, [userChannels])

  // biome-ignore lint:
  function flipContainsItem(channelId: any) {
    setTaggedChannels((prevChannels) =>
      prevChannels.map((c) => {
        if (c.channel.id === channelId) {
          // Check if newContainsItem already exists
          // biome-ignore lint:
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

  // biome-ignore lint:
  function getStateDiff(channels: any[]): any[] {
    return channels
      .filter((channel) => {
        if (
          // biome-ignore lint:
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

  // biome-ignore lint:
  const channelsStateDif: any[] = getStateDiff(taggedChannels)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <Button variant="outline" className="py-5 md:py-4" onClick={login}>
          <Typography>Add to channel</Typography>
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button
            disabled={!userChannels || userChannels.length === 0}
            variant="outline"
            className="rounded-none shadow-none py-5 md:py-4 w-full hover:bg-transparent hover:border-secondary-foreground transition-all"
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
            <Stack className="px-5 w-full max-h-[500px] overflow-y-auto space-y-[10px]">
              {taggedChannels?.map((channel, index) => (
                <Flex className="w-full justify-between items-center">
                  <ChannelCard2
                    key={index}
                    channel={channel?.channel}
                    metadata={channel?.channelItemMetadata}
                    imageBoxWidth={64}
                  />
                  <Checkbox
                    checked={
                      channel.newContainsItem
                        ? true
                        : channel.containsItem &&
                            // biome-ignore lint:
                            (!channel.hasOwnProperty('newContainsItem') ||
                              channel.newContainsItem)
                          ? true
                          : false
                    }
                    onClick={() => flipContainsItem(channel.channel.id)}
                    className="mr-2 rounded-none border-[#858585] data-[state=checked]:bg-[#858585] shadow-none"
                  />
                </Flex>
              ))}
            </Stack>
            <Separator />
            <DialogFooter className="flex flex-col py-2">
              <Button
                variant="link"
                disabled={channelsStateDif.length === 0 || isSubmitting}
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
                <Typography>{isSubmitting ? <Loading /> : 'Save'}</Typography>
              </Button>
            </DialogFooter>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
