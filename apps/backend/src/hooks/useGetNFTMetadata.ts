import { Network, Alchemy } from 'alchemy-sdk';
import { BigNumberish } from 'alchemy-sdk';

type Props = {
    network: number,
    address: string,
    tokenId: BigNumberish,
    apiKey: string,
};

const getNftMetadata = async ({ network, address, tokenId, apiKey }: Props) => {
    const alchemy_settings_mainnet = {
        apiKey: apiKey,
        network: Network.ETH_MAINNET,
    };

    const alchemyMainnet = new Alchemy(alchemy_settings_mainnet);

    if (network && address && tokenId) {
        try {
            const data = await alchemyMainnet.nft.getNftMetadata(address, tokenId);
            return data;
        } catch (error) {
            console.error('Error fetching NFT metadata:', error);
            throw error;
        }
    }
};

export default getNftMetadata;