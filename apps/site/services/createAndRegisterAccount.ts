import { type Hex, type Hash, concatHex, encodeFunctionData } from 'viem'
import { signMessage } from 'viem/accounts'
import { optimismGoerli } from 'viem/chains'
import {
  type UserOperation,
  getSenderAddress,
  getUserOperationHash,
  type GetUserOperationReceiptReturnType,
} from 'permissionless'
import { pimlicoBundlerClient, pimlicoPaymasterClient } from '../pimlicoConfig'
import { config } from '../wagmiConfig'
import {
  entryPoint,
  idRegistry,
  lightAccountFactory,
  salt,
  operator,
} from '@/constants'
import { idRegistryAbi, lightAccountAbi, lightAccountFactoryAbi } from '@/abi'

export function buildInitCode({ initialAdmin }: { initialAdmin: Hex }) {
  const initCode = concatHex([
    lightAccountFactory,
    encodeFunctionData({
      abi: lightAccountFactoryAbi,
      functionName: 'createAccount',
      args: [initialAdmin, salt],
    }),
  ])
  return initCode
}

export async function createAndRegisterAccount({
  initialAdmin,
}: {
  initialAdmin: Hex
}) {
  const initCode = buildInitCode({ initialAdmin })

  // Is this an appropriate way to grab the underlying public client in an async environment
  const senderAddress = await getSenderAddress(config.getPublicClient(), {
    initCode: initCode,
    entryPoint: entryPoint,
  })

  const registerCalldata = encodeFunctionData({
    abi: idRegistryAbi,
    functionName: 'register',
    args: [operator, operator],
  })

  const executeCalldata = encodeFunctionData({
    abi: lightAccountAbi,
    functionName: 'execute',
    args: [idRegistry, BigInt(0), registerCalldata],
  })

  const gasPrice = await pimlicoBundlerClient.getUserOperationGasPrice()

  const userOperation = {
    sender: senderAddress,
    nonce: BigInt(0),
    initCode,
    callData: executeCalldata,
    maxFeePerGas: gasPrice.fast.maxFeePerGas,
    maxPriorityFeePerGas: gasPrice.fast.maxPriorityFeePerGas,
    signature:
      '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c' as Hash, // dummy signature
  }

  const sponsorUserOperationResult =
    await pimlicoPaymasterClient.sponsorUserOperation({
      userOperation,
      entryPoint: entryPoint,
    })

  const sponsoredUserOperation: UserOperation = {
    ...userOperation,
    preVerificationGas: sponsorUserOperationResult.preVerificationGas,
    verificationGasLimit: sponsorUserOperationResult.verificationGasLimit,
    callGasLimit: sponsorUserOperationResult.callGasLimit,
    paymasterAndData: sponsorUserOperationResult.paymasterAndData,
  }

  const signature = await signMessage({
    message: {
      raw: getUserOperationHash({
        userOperation: sponsoredUserOperation as UserOperation,
        entryPoint: entryPoint,
        chainId: optimismGoerli.id,
      }),
    },
    privateKey: process.env.PRIVATE_KEY as Hash,
  })

  sponsoredUserOperation.signature = signature

  const userOperationHash = await pimlicoBundlerClient.sendUserOperation({
    userOperation: sponsoredUserOperation,
    entryPoint: entryPoint,
  })

  console.log(
    'Received User Operation hash:',
    `https://jiffyscan-frontend.vercel.app/userOpHash/${userOperationHash}?network=optimism-goerliuserOperationHash`,
  )

  // Wait for the userOperation to be included, by continually querying for the receipts
  console.log('Querying for receipts...')
  // @ts-expect-error
  let receipt: GetUserOperationReceiptReturnType = null
  while (receipt === null) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // @ts-expect-error
    receipt = await pimlicoBundlerClient.getUserOperationReceipt({
      hash: userOperationHash,
    })
    console.log(
      receipt === null
        ? 'Still waiting...'
        : `Receipt received: ${receipt.success ? 'success' : 'failure'}`,
    )
  }

  const txHash = receipt.receipt.transactionHash

  console.log(
    `UserOperation included: https://goerli-optimism.etherscan.io/tx/${txHash}`,
  )

  return { txHash, senderAddress }
}
