import { publicClient } from "@/config/publicClient";
import { relayWalletClient } from "@/config/viemWalletClient";
import { addresses, postGatewayABI } from "scrypt";
import { Hash } from "viem";
import { createNonceManager } from "./createNonceManager";

import {
  Abi,
  Account,
  Chain,
  Client,
  SimulateContractParameters,
  Transport,
  WriteContractParameters,
  WriteContractReturnType,
} from "viem";
import {
  simulateContract,
  writeContract as viem_writeContract,
} from "viem/actions";
import pRetry from "p-retry";
//   import { debug as parentDebug } from "./debug";
//   import { getNonceManager } from "./getNonceManager";
import { parseAccount } from "viem/accounts";

export async function writeContract<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainOverride extends Chain | undefined
>(
  client: Client<Transport, TChain, TAccount>,
  request: WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >
): Promise<WriteContractReturnType> {
  const nonceManager = createNonceManager({
    client: relayWalletClient,
    address: relayWalletClient.account.address,
    blockTag: "pending",
  });

  async function prepareWrite(): Promise<
    WriteContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >
  > {
    if (request.gas) {
      // debug("gas provided, skipping simulate", request.functionName, request.address);
      return request;
    }

    //   debug("simulating", request.functionName, "at", request.address);
    const result = await simulateContract<
      TChain,
      TAbi,
      TFunctionName,
      TChainOverride
    >(client, {
      ...request,
      blockTag: "pending",
      account: relayWalletClient.account.address,
    } as unknown as SimulateContractParameters<TAbi, TFunctionName, TChain, TChainOverride>);

    return result.request as unknown as WriteContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >;
  }

  const preparedWrite = await prepareWrite();



  return nonceManager.mempoolQueue.add(
    () =>
      pRetry(
        async () => {
          if (!nonceManager.hasNonce()) {
            await nonceManager.resetNonce();
          }

          const nonce = nonceManager.nextNonce();
        //   debug(
        //     "calling",
        //     preparedWrite.functionName,
        //     "with nonce",
        //     nonce,
        //     "at",
        //     preparedWrite.address
        //   );
          return await viem_writeContract(client, {
            nonce,
            ...preparedWrite,
          } as typeof preparedWrite);
        },
        {
          retries: 3,
          onFailedAttempt: async (error) => {
            // On nonce errors, reset the nonce and retry
            if (nonceManager.shouldResetNonce(error)) {
            //   debug("got nonce error, retrying", error.message);
              await nonceManager.resetNonce();
              return;
            }
            // TODO: prepareWrite again if there are gas errors?
            throw error;
          },
        }
      ),
    { throwOnTimeout: true }
  );
}
