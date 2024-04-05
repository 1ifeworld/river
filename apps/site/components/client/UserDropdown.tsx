import { useUserContext } from '@/context'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
  Separator,
} from '@/design-system'
import { useLogout } from '@privy-io/react-auth'
import Link from 'next/link'

interface UserProps {
  setOpen: (open: boolean) => void
}

export function UserDropdown({ setOpen }: UserProps) {
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
        <DropdownMenuGroup className="flex flex-col gap-3">
          <DropdownMenuItem asChild>
            <Link
              href={`/${username}`}
              className="hover:underline underline-offset-2 transition-all"
            >
              <Typography>Profile</Typography>
            </Link>
          </DropdownMenuItem>
          <div className="-mx-4">
            <Separator />
          </div>
          <DropdownMenuItem asChild>
            <Link
              href={
                '/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna'
              }
              className="hover:underline underline-offset-2 transition-all"
            >
              <Typography>Feedback</Typography>
            </Link>
          </DropdownMenuItem>
          <div className="-mx-4">
            <Separator />
          </div>
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
