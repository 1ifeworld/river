import {
  Typography,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from '@/design-system'
import { useLogout } from '@privy-io/react-auth'

export function User() {
  const { logout } = useLogout()
  // Fetch and return the username of the connected account
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Typography>Connected User</Typography>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="link" onClick={logout}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
