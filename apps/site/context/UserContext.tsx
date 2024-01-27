'use client'

import { getUserId } from '@/gql'
import { getUsername } from '@/lib'
import { type ConnectedWallet, User, useWallets } from '@privy-io/react-auth'
import { usePrivy } from '@privy-io/react-auth'
import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { type Address, createWalletClient, custom, EIP1193Provider, Client } from 'viem'
import { river_dev_2_d5hb5orqim } from '@/config/customChainConfig' 

const UserContext = createContext<{
  embeddedWallet?: ConnectedWallet
  // eip1193Client?: EIP1193Provider
  // eip1193Client?: any
  signMessage?: (
    message: string,
    uiOptions?: SignMessageModalUIOptions
  ) => Promise<string>
  userId?: bigint
  authToken: Promise<string | null>
  username?: string
  fetchUserData?: () => Promise<void>
  clearUserData?: () => void
}>({ authToken: Promise.resolve(null) })

export function UserContextComponent({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<bigint>()
  const [username, setUsername] = useState<string>()
  const [authToken, setAuthToken] = useState<Promise<string | null>>(
    Promise.resolve(null)
  )
  // const [eip1193Client, setEip1193Client] = useState<EIP1193Provider>()
  // const [eip1193Provider, setEip1193Provier] = useState<EIP1193Provider>()
  const { signMessage, getAccessToken } = usePrivy()
  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy'
  )

  async function fetchUserData() {
    if (!embeddedWallet) return

    // Setup eip1193 client
    const eip1193Provider = await embeddedWallet.getEthereumProvider();
    // setEip1193Provier(eip1193Provider)
    // const customEip1193Client = createWalletClient({
    //   chain: river_dev_2_d5hb5orqim,
    //   transport: custom(eip1193Provider as EIP1193Provider)
    // })    
    // setEip1193Client(customEip1193Client)

    // Privy auth token
    const token = await getAccessToken()
    setAuthToken(Promise.resolve(token))

    const fetchedUserId = await getUserId({
      custodyAddress: embeddedWallet.address as Address,
    })

    if (!fetchedUserId.userId) return

    setUserId(fetchedUserId.userId)

    // const fetchedUsername = await getUsername({
    //   id: BigInt(fetchedUserId.userId),
    // })

    setUsername(fetchedUserId.userId.toString())
  }

  function clearUserData() {
    setUserId(undefined)
    setUsername(undefined)
  }

  useEffect(() => {
    fetchUserData()
  }, [embeddedWallet])

  return (
    <UserContext.Provider
      value={{
        authToken,
        embeddedWallet,
        // eip1193Provider,
        // eip1193Client,
        signMessage,
        userId,
        username,
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