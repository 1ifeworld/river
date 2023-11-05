import { Hash, decodeAbiParameters } from 'viem'
import { nodeRegistryTypesABI } from '../abi'

export function decodeNodeRegistrationData({ data }: { data: Hash }): {
  schema: Hash,
  userId: bigint,
  msgType: bigint,
  msgBody: Hash,
} {
  const [decodedData] = decodeAbiParameters(
    nodeRegistryTypesABI[1].outputs,
    data,
  )

  return decodedData
}
