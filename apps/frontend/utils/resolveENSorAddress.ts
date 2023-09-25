import { http, createPublicClient, Hex} from 'viem'
import { mainnet } from 'viem/chains'


const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

/**
 * Resolves an Ethereum address to its ENS name or an ENS name to its Ethereum address.
 * @param input Either an Ethereum address or an ENS name.
 * @returns The resolved ENS name or Ethereum address.
 */
export async function resolveEnsOrAddress(input: string): Promise<string> {
  // Check if input starts with '0x', indicating it might be an Ethereum address
  if (input.startsWith('0x')) {
    try {
      const ensName = await client.getEnsName({ address: input as `0x${string}` });
      return ensName || input; // Return the resolved ENS name or the original input if no ENS name is found
    } catch (error) {
      console.error("Error resolving address to ENS:", error);
      return input; // Return the original input if there's an error
    }
  } else {
    // Assume the input is an ENS name
    try {
      const address = await client.getEnsAddress({ name: input });
      return address || input; // Return the resolved Ethereum address or the original input if no address is found
    } catch (error) {
      console.error("Error resolving ENS to address:", error);
      return input; // Return the original input if there's an error
    }
  }
}

export default resolveEnsOrAddress;


