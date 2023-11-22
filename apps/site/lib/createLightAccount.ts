import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from '@alchemy/aa-accounts'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { opGoerliViem } from '@/constants'
import { addresses } from 'scrypt'
import { type SmartAccountSigner, WalletClientSigner } from '@alchemy/aa-core'
import { registerAndDelegate } from 'lib/registerAndDelegate'

export async function createLightAccount({
  privySigner,
}: { privySigner: SmartAccountSigner }) {
  const alchemyProvider = new AlchemyProvider({
    apiKey: process.env.ALCHEMY_KEY as string,
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
  )

  console.log('Alchemy provider', alchemyProvider)

  const smartAccountAddress = await alchemyProvider.getAddress()

  console.log('Smart acccount address', smartAccountAddress)

  await registerAndDelegate({
    from: smartAccountAddress,
    provider: alchemyProvider,
  })
}
