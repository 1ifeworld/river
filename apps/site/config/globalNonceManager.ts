'server-only'

import {
  BaseError,
  BlockTag,
  Client,
  Hex,
  NonceTooHighError,
  NonceTooLowError,
} from "viem";
import { parseAccount } from "viem/accounts";
import { getTransactionCount } from "viem/actions";
import PQueue from "p-queue";
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { river_j5bpjduqfv } from './customChainConfig'

type CreateNonceManagerOptions = {
  client: Client;
  address: Hex;
  blockTag?: BlockTag;
};

type CreateNonceManagerResult = {
  account: Hex;
  hasNonce: () => boolean;
  nextNonce: () => number;
  resetNonce: () => Promise<void>;
  shouldResetNonce: (error: unknown) => boolean;
  mempoolQueue: PQueue;
};

function setupGlobalNonceManager({
  client,
  address, // TODO: rename to account?
  blockTag = "pending",
}: CreateNonceManagerOptions): CreateNonceManagerResult {
  console.log("Setting up global nonce manager");
  const nonceRef = { current: -1 };
  let channel: BroadcastChannel | null = null;
  const channelName = "relayerBroadcast";
  channel = new BroadcastChannel(channelName);
  channel.addEventListener("message", (event) => {
    const nonce = JSON.parse(event.data);
    console.log("starting nonce for relayerBroadcast channel: ", nonce);
    nonceRef.current = nonce;
  });

  function hasNonce(): boolean {
    return nonceRef.current >= 0;
  }

  function nextNonce(): number {
    if (!hasNonce()) throw new Error("call resetNonce before using nextNonce");
    const nonce = nonceRef.current++;
    channel?.postMessage(JSON.stringify(nonceRef.current));
    return nonce;
  }

  async function resetNonce(): Promise<void> {
    const nonce = await getTransactionCount(client, { address, blockTag });
    nonceRef.current = nonce;
    channel?.postMessage(JSON.stringify(nonceRef.current));
    console.log("reset nonce to", nonceRef.current);
  }

  function shouldResetNonce(error: unknown): boolean {
    return (
      error instanceof BaseError &&
      error.walk(
        (e) => e instanceof NonceTooLowError || e instanceof NonceTooHighError
      ) != null
    );
  }

  const mempoolQueue = new PQueue({ concurrency: 1 });

  console.log("is address correct in global nonce manager: ", address)

  return {
    account: address,
    hasNonce,
    nextNonce,
    resetNonce,
    shouldResetNonce,
    mempoolQueue,
  };
}

// Nonce mamanger setup

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)

export const relayWalletClient = createWalletClient({
  account,
  chain: river_j5bpjduqfv,
  transport: http(process.env.RPC_URL),
})

console.log("relay wallet  ")

const rawAccount = relayWalletClient.account;
if (!rawAccount) {
  // TODO: replace with viem AccountNotFoundError once its exported
  throw new Error("No account provided in nonce mamanger");
}
const parsedAccount = parseAccount(rawAccount);

export const globalNonceManager = setupGlobalNonceManager({
  client: relayWalletClient,
  address: parsedAccount.address,
  blockTag: "pending",
});
