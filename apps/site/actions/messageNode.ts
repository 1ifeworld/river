import {} from 'viem'

import { nodeRegistry } from '@/constants'
import { publicClient, walletClient } from '@/config'
import { nodeRegistryAbi } from '@/abi'
import { optimismGoerli } from 'viem/chains'

export async function messageNode({
  idRegistryToken,
}: { idRegistryToken: number }) {
  const { request } = await publicClient.simulateContract({
    address: nodeRegistry,
    abi: erc6551RegistryAbi,
    functionName: 'createAccount',
    args: [
      erc6551Impl,
      salt,
      BigInt(optimismGoerli.id),
      receipts,
      BigInt(idRegistryToken),
    ],
  })

  await walletClient.writeContract(request)
}
