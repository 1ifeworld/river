import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuGroup,
  Button,
  Typography,
  Toast,
} from '@/design-system'
import { processRemoveReferencePost } from '@/lib'
import { useUserContext } from '@/context'
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
      <DropdownMenuTrigger className="focus:outline-none">
        {'...'}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent side="bottom" className="w-32 mx-8">
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
