import { EditUsernameDialog } from '@/client'
import { useUserContext } from '@/context'
import {
  Button,
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
  profileUsername: string
}

export function UserSettings({ profileUsername }: UserSettingsProps) {
  const { username } = useUserContext()
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  const isUserOwnProfile = username === profileUsername

  if (!isUserOwnProfile) {
    return null
  }

  return (
    <Dialog>
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
              {/* TODO: Add ability to edit both username and bio */}
              <Button variant="link">
                <Typography>Edit username</Typography>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUsernameDialog open={open} setOpen={setOpen} />
    </Dialog>
  )
}
