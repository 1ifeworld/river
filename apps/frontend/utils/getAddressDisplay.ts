import { type Hex } from 'viem';
import { BasementSDK } from "@basementdev/sdk";
import { shortenAddress } from '.';

// hex
export async function getAddressDisplay(address: string) {

    const sdk = new BasementSDK({
        apiKey: process.env.NEXT_PUBLIC_BASEMENT_API,
        endpoint: "https://beta.basement.dev/v2/graphql"
    })

    const data = await sdk.address({
        address: address,
        include: { reverseProfile: true }
    })

    if (data?.reverseProfile?.name) {
        return data?.reverseProfile?.name
    }
    return shortenAddress(address as Hex)    
}
