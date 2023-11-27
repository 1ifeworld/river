import React, { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  Button,
} from '@/design-system'
import { useLogout } from '@privy-io/react-auth'
import { getUserId } from '@/gql'
import { type Hex } from 'viem'
import { getUsername } from '@/lib'
import { useAlchemyContext } from 'context/AlchemyProviderContext'

export function User() {
  const { logout } = useLogout()
  const [userId, setUserId] = useState<bigint | undefined>(undefined)
  const [username, setUsername] = useState<string | undefined>(undefined)

  const { alchemyProvider } = useAlchemyContext()

  useEffect(() => {
    const fetchData = async () => {
      if (!alchemyProvider) {
        console.error('Alchemy provider is not initialized')
        return
      }

      const smartAccountAddress = await alchemyProvider.getAddress()
      const userIdResponse = await getUserId({
        custodyAddress: smartAccountAddress as Hex,
      })

      if (userIdResponse && userIdResponse.userId) {
        setUserId(BigInt(userIdResponse.userId))
      } else {
        console.error('UserId not found')
        return
      }
      const usernameResponse = await getUsername({
        id: BigInt(userIdResponse.userId),
      })
      setUsername(usernameResponse.slice(0, -11))
    }

    fetchData()
  }, [alchemyProvider])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">{username || 'NaN'}</Button>
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
