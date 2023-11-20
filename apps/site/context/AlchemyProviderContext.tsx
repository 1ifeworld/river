import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import {
  LightSmartContractAccount,
} from '@alchemy/aa-accounts'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { addresses } from 'scrypt'
import { ConnectedWallet, useWallets } from '@privy-io/react-auth'
import {
  WalletClientSigner,
  type SmartAccountSigner,
  PublicErc4337Client,
  createPublicErc4337Client,
} from '@alchemy/aa-core'
import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
  type Client,
  type Hex,
  type EIP1193Provider,
} from 'viem'
import { arbitrumGoerli } from 'viem/chains'

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

  // Initialize RPC client connected to the Arbitrum Goerli Paymaster. Used to populate
      // `paymasterAndData` field of user operations.
      const paymaster: Client = useMemo(
        () =>
          createPublicClient({
            chain: arbitrumGoerli,
            transport: http(
              'https://paymaster.biconomy.io/api/v1/421613/-krdQD3UI.c27a25ff-9cd5-421c-9bb5-fa423b6274a1',
            ),
          }),
        [],
      )

      // Initialize RPC client connected to Alchemy's Base Goerli RPC URL. Used to submit
      // signed user operations to the network
      const bundler: PublicErc4337Client = useMemo(
        () =>
          createPublicErc4337Client({
            chain: arbitrumGoerli,
            rpcUrl:
              'https://bundler.biconomy.io/api/v2/421613/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',
          }),
        [],
      )

  useEffect(() => {
    const createLightAccount = async (embeddedWallet: ConnectedWallet) => {
      // Create a viem client from the embedded wallet
      const eip1193provider = await embeddedWallet?.getEthereumProvider()

      const privyClient = createWalletClient({
        account: embeddedWallet?.address as Hex,
        chain: arbitrumGoerli,
        transport: custom(eip1193provider as EIP1193Provider),
      })

      // Initialize the account's signer from the embedded wallet's viem client
      const privySigner: SmartAccountSigner = new WalletClientSigner(
        privyClient,
        'json-rpc', // signerType
      )

      setAlchemyProvider(
        new AlchemyProvider({
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
          chain: arbitrumGoerli,
          entryPointAddress: addresses.entryPoint.arbGoerli,
        }).connect(
          (rpcClient) =>
            new LightSmartContractAccount({
              entryPointAddress: addresses.entryPoint.arbGoerli,
              chain: rpcClient.chain,
              owner: privySigner,
              // Modified Light Account factory
              factoryAddress: '0x00006B00f8Ee98Eb4eA288B1E89d00702361e055',
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
