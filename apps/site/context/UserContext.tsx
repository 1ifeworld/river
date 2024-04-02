'use client'

import { getUserId } from '@/gql'
import { getUsername, getUserChannels } from '@/lib'
import {
  type ConnectedWallet,
  type SignMessageModalUIOptions,
  useWallets,
  usePrivy,
} from '@privy-io/react-auth'
import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { Address } from 'viem'

const UserContext = createContext<{
  embeddedWallet?: ConnectedWallet
  signMessage?: (
    message: string,
    uiOptions?: SignMessageModalUIOptions,
  ) => Promise<string>
  userId?: bigint
  username?: string
  // biome-ignore lint:
  userChannels?: any[]
  fetchUserData?: () => Promise<void>
  clearUserData?: () => void
}>({})

export function UserContextComponent({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<bigint>()
  const [username, setUsername] = useState<string>()
  // biome-ignore lint:
  const [userChannels, setUserChannels] = useState<any[]>([])

  const { signMessage } = usePrivy()
  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy',
  )

  async function fetchUserData() {
    if (!embeddedWallet) return

    const fetchedUserId = await getUserId({
      custodyAddress: embeddedWallet.address as Address,
    })

    if (!fetchedUserId.userId) return

    setUserId(fetchedUserId.userId)

    const fetchedUsername = await getUsername({
      id: BigInt(fetchedUserId.userId),
    })

    setUsername(fetchedUsername)

    const userChannels = await getUserChannels(fetchedUserId.userId)
    if (userChannels) setUserChannels(userChannels)
  }

  function clearUserData() {
    setUserId(undefined)
    setUsername(undefined)
    setUserChannels([])
  }

  useEffect(() => {
    fetchUserData()
  }, [embeddedWallet])

  return (
    <UserContext.Provider
      value={{
        embeddedWallet,
        signMessage,
        userId,
        username,
        userChannels,
        fetchUserData,
        clearUserData,
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
