import { useUserContext } from '@/context'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Toast,
  Typography,
} from '@/design-system'
import { processRemoveItemPost } from 'lib/posts'
import { toast } from 'sonner'
import { Hex } from 'viem'

interface ItemDropdownProps {
  itemCid: string
  itemRemoved: boolean
  channelCid: string
  itemRemovedIndex: number
}

export function ItemDropdown({
  itemCid,
  itemRemoved,
  channelCid,
  itemRemovedIndex
}: ItemDropdownProps) {
  const { signMessage, userId: targetUserId, embeddedWallet } = useUserContext()

  console.log("itemcid: ", itemCid)
  console.log("both: ", `${channelCid}/${itemCid}`)
  console.log("number: ", itemRemovedIndex)
  console.log("itemRemoved: ", itemRemoved)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none md:mr-4 mb-1">
        <Typography variant="h2">{'...'}</Typography>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent side="bottom" className="w-32 mx-4 md:mx-6">
          <DropdownMenuGroup className="flex flex-col gap-2">
            <DropdownMenuItem>
              <Button
                variant="link"
                type="submit"
                disabled={!targetUserId}
                onClick={async () => {
                  if (!embeddedWallet?.address) return false
                  // initialize bool for txn success check
                  let txSuccess: boolean = false
                  // Generate removeReference post
                  if (signMessage) {
                    txSuccess = await processRemoveItemPost({
                      rid: targetUserId as bigint,
                      signer: embeddedWallet.address as Hex,
                      itemCid: itemCid,
                      channelCid: channelCid,
                      privySignMessage: signMessage
                    })
                    if (txSuccess) {
                      toast.custom((t) => (
                        <Toast>{'Item successfully removed'}</Toast>
                      ))
                    } else {
                      ;<Toast>{'Error removing item'}</Toast>
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
