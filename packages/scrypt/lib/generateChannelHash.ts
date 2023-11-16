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
}): string {

    const concatenatedInputs: string = `${chainId}/${nodeRegistryAddress}/${schema}/${nodeId}/`
    const hashedInputs: Hash = keccak256(stringToHex(concatenatedInputs))
    const removed0xPrefix: string = hashedInputs.slice(2)
    // Keep only the leading 16 bytes (32 characters)
    const extractFirst16Bytes: string = removed0xPrefix.slice(0, 32)
    const lowercase: string = extractFirst16Bytes.toLowerCase()

    return lowercase
}
