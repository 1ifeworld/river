import { useUserContext } from '@/context'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Loading,
  Toast,
  Typography,
} from '@/design-system'
import type { Adds, Channel, ChannelRoles } from '@/gql'
import { processRemoveItemPost } from 'lib/posts'
import { useState } from 'react'
import { toast } from 'sonner'
import type { Hex } from 'viem'

interface ItemDropdownProps {
  channel: Channel
  add: Adds
}

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

export function ItemDropdown({ channel, add }: ItemDropdownProps) {
  const { signMessage, userId: targetUserId, embeddedWallet } = useUserContext()
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isRemoving}
        className="focus:outline-none mb-1"
      >
        <Typography className="hover:font-bold" variant="h2">
          {isRemoving ? <Loading /> : '...'}
        </Typography>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent side="bottom" align="end" className="w-32">
          <DropdownMenuGroup className="flex flex-col gap-2">
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
