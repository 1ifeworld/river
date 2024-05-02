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
import { getUserId } from '@/gql'
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

    // try to fetch data from username db
    const data = await getUserDataByOwner({ owner: embeddedWallet.address })
    let userIdFromDelta
    if (data) {
      // if succcessful from username db, set user id, name, and channels for user
      setUserId(BigInt(data.records.id))
      setUsername(data.records.name)
      const userChannels = await getUserChannels(data.records.id)
      if (userChannels) setUserChannels(userChannels)
    } else {
      // if not successful from username db, fetch from ponder. means that user may have id
      // but not username yet
      userIdFromDelta = await getUserId({
        custodyAddress: embeddedWallet.address as Address,
      })
      if (!userIdFromDelta.userId) return
      setUserId(userIdFromDelta.userId)
    }
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
