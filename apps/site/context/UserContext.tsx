'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from '@alchemy/aa-accounts'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { useWallets, type ConnectedWallet, User } from '@privy-io/react-auth'
import { usePrivy } from '@privy-io/react-auth'
import { getUserId } from '@/gql'
import { getUsername } from '@/lib'
import { WalletClientSigner, type SmartAccountSigner } from '@alchemy/aa-core'
import {
  createWalletClient,
  custom,
  type EIP1193Provider,
  type Address,
} from 'viem'
import { optimismGoerli } from 'viem/chains'
import { addresses } from 'scrypt'
import { SignMessageModalUIOptions } from '@privy-io/react-auth'

const UserContext = createContext<{
  alchemyProvider?: AlchemyProvider
  smartAccountAddress?: Address
  signMessage?: (
    message: string,
    uiOptions?: SignMessageModalUIOptions,
  ) => Promise<string>
  userId?: bigint
  username?: string
}>({})

export function UserContextComponent({ children }: { children: ReactNode }) {
  const [alchemyProvider, setAlchemyProvider] = useState<AlchemyProvider>()
  const [smartAccountAddress, setSmartAccountAddress] = useState<Address>()
  const [userId, setUserId] = useState<bigint>()
  const [username, setUsername] = useState<string>()

  const { signMessage } = usePrivy()
  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy',
  )

  useEffect(() => {
    if (embeddedWallet) {
      const initializeAlchemyProvider = async (
        embeddedWallet: ConnectedWallet,
      ) => {
        // Create a viem client from the embedded wallet
        const eip1193provider = await embeddedWallet.getEthereumProvider()

        const privyClient = createWalletClient({
          account: embeddedWallet.address as Address,
          chain: optimismGoerli,
          transport: custom(eip1193provider as EIP1193Provider),
        })

        // Create a smart account signer from the embedded wallet's viem client
        const privySigner: SmartAccountSigner = new WalletClientSigner(
          privyClient,
          'json-rpc', // signerType
        )

        const alchemyProvider = new AlchemyProvider({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
          chain: optimismGoerli,
          entryPointAddress: addresses.entryPoint.opGoerli,
        }).connect(
          (rpcClient) =>
            new LightSmartContractAccount({
              entryPointAddress: addresses.entryPoint.opGoerli,
              chain: rpcClient.chain,
              owner: privySigner,
              factoryAddress: getDefaultLightAccountFactory(rpcClient.chain),
              rpcClient,
            }),
        )

        setAlchemyProvider(alchemyProvider)

        const smartAccountAddress = await alchemyProvider.getAddress()

        setSmartAccountAddress(smartAccountAddress as Address)
      }

      initializeAlchemyProvider(embeddedWallet)
    }
  }, [embeddedWallet?.address])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!smartAccountAddress) {
        return
      }

      const { userId } = await getUserId({
        custodyAddress: smartAccountAddress as Address,
      })

      setUserId(userId)

      const fetchedUsername = await getUsername({
        id: BigInt(userId),
      })

      setUsername(fetchedUsername)
    }

    fetchUserData()
  }, [smartAccountAddress])

  return (
    <UserContext.Provider
      value={{
        alchemyProvider,
        smartAccountAddress,
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
