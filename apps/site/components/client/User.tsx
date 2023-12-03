import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from '@/design-system'
import { useUserContext } from '@/context'
import { useLogout } from '@privy-io/react-auth'

export function User() {
  const { logout } = useLogout()
  const { username} = useUserContext()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">{username}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
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
