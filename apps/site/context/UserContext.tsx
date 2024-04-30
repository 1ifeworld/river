'use client'

import { getUserChannels } from '@/lib'
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
import { getUserDataByOwner } from '@/lib'

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

    const data = await getUserDataByOwner({ owner: embeddedWallet.address })

    if (!data) return

    setUserId(BigInt(data.records.id))
    setUsername(data.records.name)

    const userChannels = await getUserChannels(data.records.id)
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
