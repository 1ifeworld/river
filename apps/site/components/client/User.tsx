import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
  Typography,
} from '@/design-system'
import { useUserContext } from '@/context'
import { useLogout } from '@privy-io/react-auth'

interface UserProps {
  setOpen: (open: boolean) => void
}

export function User({ setOpen }: UserProps) {
  const { logout } = useLogout({
    onSuccess: () => {
      if (clearUserData) {
        clearUserData()
      }
    },
  })
  const { username, clearUserData } = useUserContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">{username ? username : 'Logout'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
        <DropdownMenuGroup className="flex flex-col gap-2">
          {/* Change Username  */}
          {/* <DropdownMenuItem>
            <Button variant="link" onClick={() => setOpen(true)}>
            <Typography>
              Change Username
              </Typography>
            </Button>
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Button variant="link" onClick={logout}>
              <Typography>Logout</Typography>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
