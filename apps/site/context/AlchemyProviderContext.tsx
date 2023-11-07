import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from '@alchemy/aa-accounts'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { opGoerliViem } from '@/constants'
import { entryPoint } from 'offchain-schema'
import { useWallets } from '@privy-io/react-auth'
import { WalletClientSigner, type SmartAccountSigner } from '@alchemy/aa-core'
import {
  createWalletClient,
  custom,
  type Hex,
  type EIP1193Provider,
} from 'viem'

const AlchemyContext = createContext<{
  alchemyProvider?: AlchemyProvider
}>({})

export function AlchemyProviderComponent({
  children,
}: { children: ReactNode }) {
  const { isConnected } = useAccount()
  const { data: walletClientData } = useWalletClient()
  const [alchemyProvider, setAlchemyProvider] = useState<AlchemyProvider>()
  const { wallets } = useWallets()

  useEffect(() => {
    if (!isConnected) return

    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === 'privy',
    )
    ;(async () => {
      // Get a viem client from the embedded wallet
      const eip1193provider = await embeddedWallet?.getEthereumProvider()
      const privyClient = createWalletClient({
        account: embeddedWallet?.address as Hex,
        chain: opGoerliViem,
        transport: custom(eip1193provider as EIP1193Provider),
      })
      // Create a smart account signer from the embedded wallet's viem client
      const privySigner: SmartAccountSigner = new WalletClientSigner(
        privyClient,
        'json-rpc', // signerType
      )

      setAlchemyProvider(
        new AlchemyProvider({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
          chain: opGoerliViem,
          entryPointAddress: entryPoint,
        }).connect(
          (rpcClient) =>
            new LightSmartContractAccount({
              entryPointAddress: entryPoint,
              chain: rpcClient.chain,
              owner: privySigner,
              factoryAddress: getDefaultLightAccountFactory(rpcClient.chain),
              rpcClient,
            }),
        ),
      )
    })()
  }, [isConnected, walletClientData])

  return (
    <AlchemyContext.Provider value={{ alchemyProvider }}>
      {children}
    </AlchemyContext.Provider>
  )
}

// Access the context value of the ProviderContext
export const useAlchemyContext = () => {
  const context = useContext(AlchemyContext)
  if (!context) {
    throw Error('useAlchemyContext hook must be used within a AlchemyContext')
  }
  return context.alchemyProvider
}
