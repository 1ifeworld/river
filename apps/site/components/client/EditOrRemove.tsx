import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    Button,
    Typography,
  } from '@/design-system'
  import { processRemoveReferencePost } from '@/lib'
  import { useUserContext } from '@/context'
  
  interface EditOrRemoveProps {
    targetChannelId: bigint
    itemsToRemove: bigint[]
  }
  
  export function EditOrRemove({
    targetChannelId,
    itemsToRemove,
  }: EditOrRemoveProps) {
    const { signMessage, userId: targetUserId } = useUserContext()
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          {'...'}
        </DropdownMenuTrigger>
        {/* mx-8 */}
        <DropdownMenuContent side="top" className="w-32 mx-8">
          <DropdownMenuItem className="py-1">
            <Button variant="link" disabled={true}>
              <Typography>Edit item</Typography>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-1">
            <form
              action={async () => {
                if (signMessage) {
                  await processRemoveItemsPost({
                    targetChannelId: targetChannelId,
                    targetUserId: targetUserId as bigint,
                    privySignMessage: signMessage,
                    itemsToRemove,
                  })
                }
                // TODO: Add a confirmation toast with the name of the item being removed
              }}
            >
              <Button variant="link" type="submit" disabled={!targetUserId}>
                <Typography>Remove item</Typography>
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }