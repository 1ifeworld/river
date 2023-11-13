import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from '@/design-system'
import { useLogout } from '@privy-io/react-auth'
import { useState, useEffect } from 'react'
import { getUserId } from '@/lib'
import { useAlchemyContext } from '@/context'
import { type Hex } from 'viem'

export function User() {
  const { logout } = useLogout()

  const [userId, setUserId] = useState<bigint>()

  const { alchemyProvider, smartAccountAddress } = useAlchemyContext()

  useEffect(() => {
    // biome-ignore format:
    (async () => {
      const userId = await getUserId({
        smartAccountAddress: smartAccountAddress as Hex,
      })
      setUserId(userId)
    })()
  }, [alchemyProvider])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* TODO: Update to fetch and return the username of the connected account */}
        <Button variant="link">User</Button>
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
