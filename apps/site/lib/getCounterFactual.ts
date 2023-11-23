import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from "@alchemy/aa-accounts";
import { ConnectedWallet, useWallets } from "@privy-io/react-auth";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import {
  createWalletClient,
  custom,
  type EIP1193Provider,
  type Address,
} from "viem";
import { SmartAccountSigner, WalletClientSigner } from "@alchemy/aa-core";
import { opGoerliViem } from "@/constants";
import { addresses } from "scrypt";

export async function getCounterfactual({
  connectedPrivyAccount,
}: {
  connectedPrivyAccount: ConnectedWallet;
}) {
  const eip1193provider = await connectedPrivyAccount?.getEthereumProvider();
  const privyClient = createWalletClient({
    account: connectedPrivyAccount?.address as Address,
    chain: opGoerliViem,
    transport: custom(eip1193provider as EIP1193Provider),
  });
  const privySigner: SmartAccountSigner = new WalletClientSigner(
    privyClient,
    "json-rpc" // signerType
  );
  const alchemyConfig = new AlchemyProvider({
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
      })
  );

  return await alchemyConfig.account.getAddress();
}
