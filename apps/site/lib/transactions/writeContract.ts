import {
  Abi,
  Account,
  Chain,
  Client,
  SimulateContractParameters,
  Transport,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import {
  simulateContract,
  writeContract as viem_writeContract,
} from 'viem/actions'
import pRetry from 'p-retry'
import { parseAccount } from 'viem/accounts'
import { createNonceManager } from '@/lib'

export async function writeContract<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  request: WriteContractParameters<
    TAbi,
    TFunctionName,
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  const rawAccount = request.account ?? client.account
  if (!rawAccount) {
    // TODO: replace with viem AccountNotFoundError once its exported
    throw new Error('No account provided')
  }
  const account = parseAccount(rawAccount)

  const nonceManager = createNonceManager({
    client,
    address: account.address,
    blockTag: 'pending',
  })

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
      console.log('gas value provided in txn request, skipping simulation')
      return request
    }

    const result = await simulateContract<
      TChain,
      TAbi,
      TFunctionName,
      TChainOverride
    >(client, {
      ...request,
      blockTag: 'pending',
      account: account,
    } as unknown as SimulateContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TChainOverride
    >)

    return result.request as unknown as WriteContractParameters<
      TAbi,
      TFunctionName,
      TChain,
      TAccount,
      TChainOverride
    >
  }

  const preparedWrite = await prepareWrite()

  return nonceManager.mempoolQueue.add(
    () =>
      pRetry(
        async () => {
          if (!nonceManager.hasNonce()) {
            await nonceManager.resetNonce()
          }

          const nonce = nonceManager.nextNonce()
          return await viem_writeContract(client, {
            nonce,
            ...preparedWrite,
          } as typeof preparedWrite)
        },
        {
          retries: 3,
          onFailedAttempt: async (error) => {
            // On nonce errors, reset the nonce and retry
            if (nonceManager.shouldResetNonce(error)) {
              //   debug("got nonce error, retrying", error.message);
              console.log(
                'error getting nonce – retrying. error: ',
                error.message,
              )
              await nonceManager.resetNonce()
              return
            }
            // TODO: prepareWrite again if there are gas errors?
            throw error
          },
        },
      ),
    { throwOnTimeout: true },
  )
}
