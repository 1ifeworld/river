import { Hex, stringToHex, keccak256, Hash } from 'viem'

export function generateChannelHash({   
    chainId,
    nodeRegistryAddress,
    schema,
    nodeId
}: {
    chainId: bigint,
    nodeRegistryAddress: Hex,
    schema: Hash,
    nodeId: bigint
}): Hash {

    const concatenatedInputs: string = `${chainId}/${nodeRegistryAddress}/${schema}/${nodeId}/`
    const hashedInputs: Hash = keccak256(stringToHex(concatenatedInputs))

    return keccak256(stringToHex(concatenatedInputs))
}
