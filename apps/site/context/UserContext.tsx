'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useWallets, type ConnectedWallet, User } from '@privy-io/react-auth'
import { usePrivy } from '@privy-io/react-auth'
import { getUserId } from '@/gql'
import { getUsername } from '@/lib'
import { type Address } from 'viem'
import { SignMessageModalUIOptions } from '@privy-io/react-auth'

const UserContext = createContext<{
  embeddedWallet?: ConnectedWallet
  signMessage?: (
    message: string,
    uiOptions?: SignMessageModalUIOptions,
  ) => Promise<string>
  userId?: bigint
  username?: string
}>({})

export function UserContextComponent({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<bigint>()
  const [username, setUsername] = useState<string>()
  const { signMessage } = usePrivy()
  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy',
  )

  useEffect(() => {
    const fetchUserData = async () => {
      if (!embeddedWallet) return

      const { userId } = await getUserId({
        custodyAddress: embeddedWallet.address as Address,
      })

      if (!userId) return

      setUserId(userId)

      const fetchedUsername = await getUsername({
        id: BigInt(userId),
      })

      setUsername(fetchedUsername)
    }

    fetchUserData()
  }, [embeddedWallet])

  return (
    <UserContext.Provider
      value={{
        embeddedWallet,
        signMessage,
        userId,
        username,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Access the value of `UserContext`
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw Error('useUserContext hook must be used within UserContext')
  }
  return context
}

export default UserContextComponent
