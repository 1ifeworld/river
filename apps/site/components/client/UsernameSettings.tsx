import { EditUsernameDialog } from '@/client'
import { useUserContext } from '@/context'
import {
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Loading,
  Typography,
} from '@/design-system'
import { getDataForUsername, usernameSchema } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'debounce'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

interface UserSettingsProps {
  user: RiverUser
}

interface RiverUser {
  rid: bigint
}

export function UserSettings({ user }: UserSettingsProps) {
  const { signMessage, userId, embeddedWallet } = useUserContext()
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  function isUser({ userRid }: { userRid: bigint }) {
    const rid = userId
    return rid === userRid
  }

  const enableEditMembers =
    !embeddedWallet?.address || !userId
      ? false
      : isUser({
          userRid: userId,
        })

  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })
  const [validationComplete, setValidationComplete] = useState(false)

  // Subscribe to changes to the username input
  const watchUsername = debounce(() => form.watch('username'), 500)

  // username checkibng
  const triggerValidation = useMemo(
    () =>
      debounce(() => {
        form.trigger('username')
        setValidationComplete(true)
      }, 500),
    [form],
  )

  return (
    <Dialog>
      {/* Dropdown logic */}
      <DropdownMenu>
        {enableEditMembers && (
          <DropdownMenuTrigger
            disabled={isConfiguring}
            className="focus:outline-none mb-1"
          >
            <Typography className="hover:font-bold" variant="h2">
              {isConfiguring ? <Loading /> : '...'}
            </Typography>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuGroup className="flex flex-col gap-3">
            <DropdownMenuItem onClick={() => setOpen(true)}>
              {/* Edit Profile logic pending */}
              <Typography>Edit Profile</Typography>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog logic */}
      <EditUsernameDialog open={open} setOpen={setOpen} />
    </Dialog>
  )
}
