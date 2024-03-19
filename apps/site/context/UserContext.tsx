'use client'

import { getUserId } from '@/gql'
import { getUsername, getUserChannels } from '@/lib'
import { type ConnectedWallet, useWallets } from '@privy-io/react-auth'
import { usePrivy } from '@privy-io/react-auth'
import type { SignMessageModalUIOptions } from '@privy-io/react-auth'
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
  authToken?: string | null
  username?: string
  userChannels?: any[]
  fetchUserData?: () => Promise<void>
  clearUserData?: () => void
}>({ authToken: null })

export function UserContextComponent({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<bigint>()
  const [username, setUsername] = useState<string>()
  const [userChannels, setUserChannels] = useState<any[]>([])
  const [authToken, setAuthToken] = useState<string | null>(null)

  const { signMessage, getAccessToken } = usePrivy()
  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy',
  )

  async function fetchUserData() {
    if (!embeddedWallet) return

    const token = await getAccessToken()
    setAuthToken(token)

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

    console.log('userchannels: ', userChannels)
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
        authToken,
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
