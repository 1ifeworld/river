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
import { processRemoveReferencePost } from '@/lib'
import { toast } from 'sonner'

interface ItemDropdownProps {
  targetChannelId: bigint
  targetReferenceId: bigint
}

export function ItemDropdown({
  targetChannelId,
  targetReferenceId,
}: ItemDropdownProps) {
  const { signMessage, userId: targetUserId, embeddedWallet } = useUserContext()

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
                  if (signMessage) {
                    await processRemoveReferencePost({
                      targetUserId: targetUserId as bigint,
                      targetChannelId: targetChannelId,
                      targetReferenceId: targetReferenceId,
                      privySignerAddress: embeddedWallet?.address as string,
                      privySignMessage: signMessage,
                    })

                    toast.custom((t) => (
                      <Toast>{'Item successfully removed'}</Toast>
                    ))
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
