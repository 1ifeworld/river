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
import { opGoerliViem } from '@/constants'
import { addresses } from 'scrypt'
import { ConnectedWallet, useWallets } from '@privy-io/react-auth'
import { WalletClientSigner, type SmartAccountSigner } from '@alchemy/aa-core'
import {
  createWalletClient,
  custom,
  type Hex,
  type EIP1193Provider,
} from 'viem'

const AlchemyContext = createContext<{
  alchemyProvider?: AlchemyProvider
  smartAccountAddress?: Hex
}>({})

export function AlchemyProviderComponent({
  children,
}: { children: ReactNode }) {
  const [alchemyProvider, setAlchemyProvider] = useState<AlchemyProvider>()
  const [smartAccountAddress, setSmartAccountAddress] = useState<Hex>()
  const { wallets } = useWallets()

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy',
  )

  useEffect(() => {
    const createLightAccount = async (embeddedWallet: ConnectedWallet) => {
      // Create a viem client from the embedded wallet
      const eip1193provider = await embeddedWallet?.getEthereumProvider()

      const privyClient = createWalletClient({
        account: embeddedWallet?.address as Hex,
        chain: opGoerliViem,
        transport: custom(eip1193provider as EIP1193Provider),
      })

      // Initialize the account's signer from the embedded wallet's viem client
      const privySigner: SmartAccountSigner = new WalletClientSigner(
        privyClient,
        'json-rpc', // signerType
      )

      console.log("privy signer: ", privySigner)

      setAlchemyProvider(
        new AlchemyProvider({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
          chain: opGoerliViem,
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
        ),
      )

      setSmartAccountAddress(await alchemyProvider?.getAddress())
    }

    if (embeddedWallet) createLightAccount(embeddedWallet)
  }, [embeddedWallet?.address])

  return (
    <AlchemyContext.Provider value={{ alchemyProvider, smartAccountAddress }}>
      {children}
    </AlchemyContext.Provider>
  )
}

// Access the context value of the AlchemyContext
export const useAlchemyContext = () => {
  const context = useContext(AlchemyContext)
  if (!context) {
    throw Error('useAlchemyContext hook must be used within a AlchemyContext')
  }
  return context
}
