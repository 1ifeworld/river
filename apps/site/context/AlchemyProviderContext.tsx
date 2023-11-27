'use client'

import {
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
import { useWallets, type ConnectedWallet } from '@privy-io/react-auth'
import { WalletClientSigner, type SmartAccountSigner } from '@alchemy/aa-core'
import {
  createWalletClient,
  custom,
  type Hex,
  type EIP1193Provider,
  Address,
} from 'viem'
import { optimismGoerli } from 'viem/chains'
import { addresses } from 'scrypt'

const AlchemyContext = createContext<{
  alchemyProvider?: AlchemyProvider
  smartAccountAddress?: Hex
}>({})

export function AlchemyProviderComponent({
  children,
}: { children: ReactNode }) {
  const [alchemyProvider, setAlchemyProvider] = useState<AlchemyProvider>()
  const [smartAccountAddress, setSmartAccountAddress] = useState<Address>()

  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy',
  )

  useEffect(() => {
    const initializeAlchemyProvider = async (
      embeddedWallet: ConnectedWallet,
    ) => {
      /**
       * Create a viem client from the embedded wallet
       **/
      const eip1193provider = await embeddedWallet?.getEthereumProvider()

      const privyClient = createWalletClient({
        account: embeddedWallet?.address as Hex,
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

      console.log('PROVIDER: THIS IS SALIEFS CODE', alchemyProvider)

      setAlchemyProvider(alchemyProvider)

      const smartAccountAddress = await alchemyProvider?.getAddress()

      console.log(smartAccountAddress)

      setSmartAccountAddress(smartAccountAddress as Address)
    }

    if (embeddedWallet) initializeAlchemyProvider(embeddedWallet)
  }, [embeddedWallet?.address])

  return (
    <AlchemyContext.Provider value={{ alchemyProvider, smartAccountAddress }}>
      {children}
    </AlchemyContext.Provider>
  )
}

// Access the context value of the ProviderContext
export const useAlchemyContext = () => {
  const context = useContext(AlchemyContext)
  if (!context) {
    throw Error('useAlchemyContext hook must be used within AlchemyContext')
  }
  return context
}
