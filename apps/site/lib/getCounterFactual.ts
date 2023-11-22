import {
  LightSmartContractAccount,
  getDefaultLightAccountFactory,
} from "@alchemy/aa-accounts";
import { ConnectedWallet, useWallets } from "@privy-io/react-auth";
import {
  createWalletClient,
  custom,
  type EIP1193Provider,
  type Address,
  http,
} from "viem";
import { opGoerliViem } from "@/constants";
import {
  LocalAccountSigner,
  SmartAccountSigner,
  WalletClientSigner,
} from "@alchemy/aa-core";
import { publicClient } from "../config/publicClient";

export async function getCounterfactual({connectedPrivyAccount}: {connectedPrivyAccount: ConnectedWallet}) {
  const transport = http(
    `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  );

  // const walletClient = createWalletClient({
  //     account: embeddedWallet?.address as Address,
  //     chain: opGoerliViem,
  //     transport: transport,
  //   })

  //   // Initialize the account's signer from the embedded wallet's viem client
  //   const ourSigner: SmartAccountSigner = new WalletClientSigner(
  //     walletClient,
  //     "json-rpc" // signerType
  //   );

  // Create a viem client from the embedded wallet
  const eip1193provider = await connectedPrivyAccount?.getEthereumProvider();

  const privyClient = createWalletClient({
    account: connectedPrivyAccount?.address as Address,
    chain: opGoerliViem,
    transport: custom(eip1193provider as EIP1193Provider),
  });

  // Initialize the account's signer from the embedded wallet's viem client
  const privySigner: SmartAccountSigner = new WalletClientSigner(
    privyClient,
    "json-rpc" // signerType
  );

  const counterFactualAddress = await privySigner.getAddress();

  return counterFactualAddress;
}
