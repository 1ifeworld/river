import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import type { Hex } from 'viem'
import { usePrivy } from '@privy-io/react-auth'
import { useUserContext } from '@/context'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Loading,
  Toast,
  Typography,
  Separator,
  Stack,
  Flex,
  Checkbox,
} from '@/design-system'
import {
  getChannelsForItem,
  type Adds,
  type Channel,
  type ChannelRoles,
  type Item,
} from '@/gql'
import { processRemoveItemPost, processBatchMoveItemPost } from '@/lib'
import { ChannelCard2 } from '@/client'

function isAdminOrAdder({
  userRid,
  channelRoleData,
  itemAddedBy,
}: {
  userRid: bigint
  channelRoleData: ChannelRoles[]
  itemAddedBy: bigint
}) {
  // if targetRid was itemAdder, they have remove access
  if (userRid === itemAddedBy) {
    return true
  }
  // if targetRid wasnt itemAdder, loop through channel roles
  // to see if they have admin access for channel
  for (let i = 0; i < channelRoleData.length; ++i) {
    const rid = channelRoleData[i].rid
    if (rid === userRid && channelRoleData[i].role > 1) {
      return true
    }
  }
  return false
}

export function ItemDropdown({
  channel,
  add,
  item,
  showRemove = false,
}: { channel: Channel; add: Adds; item: Item; showRemove?: boolean }) {
  /*
    General state/hooks
  */
  const { login, authenticated } = usePrivy()
  const {
    signMessage,
    userId: targetUserId,
    embeddedWallet,
    userChannels,
  } = useUserContext()
  const [dialogOpen, setDialogOpen] = useState(false)

  /*
    remove item state + helpers
  */
  const [isRemoving, setIsRemoving] = useState(false)
  const enableRemoveItem =
    !embeddedWallet?.address ||
    !targetUserId ||
    !channel?.roles?.items ||
    !add?.addedById
      ? false
      : isAdminOrAdder({
          userRid: targetUserId,
          channelRoleData: channel.roles.items,
          itemAddedBy: add.addedById,
        })

  /*
    add to channel state + helpers
  */
  // biome-ignore lint:
  const [taggedChannels, setTaggedChannels] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
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
        // update taggedChannels state if processedChannels returned
        if (processedChannels) setTaggedChannels(processedChannels)

        // TODO: add in any relevant sorting
      } catch (error) {
        console.error('Error tagging channels:', error)
      }
    }

    if (userChannels) {
      tagChannels()
    }
  }, [userChannels])

  /*
    for items that previously are in a channel, dont enable deselecting
    for item that were not in a channel, enable selecting/deselecting
  */

  // biome-ignore lint:
  function flipContainsItem(channelId: any) {
    setTaggedChannels((prevChannels) =>
      prevChannels.map((c) => {
        if (c.channel.id === channelId) {
          if (c.containsItem === true) {
            return c
          } else {
            // biome-ignore lint:
            if (!c.hasOwnProperty('newContainsItem')) {
              return { ...c, newContainsItem: true }
            } else {
              return { ...c, newContainsItem: !c.newContainsItem }
            }
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
      {/* Dropdown logic */}
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isRemoving || isSubmitting}
          className="focus:outline-none mb-1"
        >
          <Typography className="hover:font-bold" variant="h2">
            {isRemoving || isSubmitting ? <Loading /> : '...'}
          </Typography>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem>
            {!authenticated ? (
              <Button variant="link" onClick={login}>
                <Typography>Add to channel</Typography>
              </Button>
            ) : (
              <DialogTrigger asChild>
                <Button variant="link">
                  <Typography>Add to channel</Typography>
                </Button>
              </DialogTrigger>
            )}
          </DropdownMenuItem>
          {showRemove && (
            <>
              <div className="my-4 -mx-4">
                <Separator />
              </div>
              <DropdownMenuItem>
                <Button
                  variant="link"
                  type="submit"
                  disabled={!enableRemoveItem}
                  onClick={async () => {
                    if (!embeddedWallet?.address) return false
                    // set isRemoving state to true
                    setIsRemoving(true)
                    // initialize bool for txn success check
                    let txSuccess = false
                    // Generate removeReference post
                    if (signMessage) {
                      txSuccess = await processRemoveItemPost({
                        rid: targetUserId as bigint,
                        signer: embeddedWallet.address as Hex,
                        itemCid: add.itemId,
                        channelCid: channel.id,
                        privySignMessage: signMessage,
                      })
                      if (txSuccess) {
                        toast.custom((t) => (
                          <Toast>{'Item successfully removed'}</Toast>
                        ))
                        setIsRemoving(false)
                      } else {
                        toast.custom((t) => (
                          <Toast>{'Error removing item'}</Toast>
                        ))
                        setIsRemoving(false)
                      }
                    }
                  }}
                >
                  <Typography>Remove item</Typography>
                </Button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog logic logic */}
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
            <Stack className="px-5 w-full max-h-[350px] md:max-h-[500px] overflow-y-auto space-y-[10px]">
              {taggedChannels.length === 0 ? (
                <Flex className="w-full justify-between items-center">
                  <Typography>No channels created yet</Typography>
                </Flex>
              ) : (
                <>
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
                </>
              )}
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
                    setDialogOpen(false)
                    if (txSuccess) {
                      toast.custom((t) => (
                        <Toast>{`Item${
                          channelsStateDif.length > 1 ? 's' : ''
                        } added successfully`}</Toast>
                      ))
                      setIsSubmitting(false)
                    } else {
                      toast.custom((t) => (
                        <Toast>{`Error moving item${
                          channelsStateDif.length > 1 ? 's' : ''
                        }`}</Toast>
                      ))
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
