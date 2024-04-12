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
import { useState } from 'react'

interface UserSettingsProps {
  user: bigint
  profileUsername: string
}

export function UserSettings({ user, profileUsername }: UserSettingsProps) {
  const { userId, username } = useUserContext()
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  function isUser({ userRid }: { userRid: bigint }) {
    const rid = userId
    return rid === userRid
  }

  const isUserOwnProfile = username === profileUsername

  if (!isUserOwnProfile) {
    return null
  }

  return (
    <Dialog>
      {/* Dropdown logic */}
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={isConfiguring}
          className="focus:outline-none mb-1"
        >
          <Typography className="hover:font-bold" variant="h2">
            {isConfiguring ? <Loading /> : '...'}
          </Typography>
        </DropdownMenuTrigger>
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
