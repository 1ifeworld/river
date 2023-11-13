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
  // Fetch and return the username of the connected account

  const [userId, setUserId] = useState<bigint>()
  const { alchemyProvider, smartAccountAddress } = useAlchemyContext()

  console.log('Alchemy provider', alchemyProvider)

  console.log('User id', userId)

  useEffect(() => {
    // biome-ignore format:
    (async () => {
      const smartAccountAddress = await alchemyProvider?.getAddress()
      const userId = await getUserId({
        smartAccountAddress: smartAccountAddress as Hex,
      })
      setUserId(userId)
    })()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">{userId?.toString()}</Button>
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
