import { BigNumberish } from "alchemy-sdk";
import {fetch} from 'cross-fetch'

type Props = {
  network: number;
  address: string;
  tokenId: BigNumberish;
  apiKey: string;
};
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const getNftMetadata = async ({ network, address, tokenId, apiKey }: Props) => {
    // for multichain we will need to have agnostic baseURL 
    if (network !== 1 ) {
      console.error("Only mainnet is support at the moment.")
    }
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/getNFTMetadata?`;
    const fullURL = baseURL + `contractAddress=${address}&tokenId=${tokenId}`;

    if (network && address && tokenId) {
      try {
        const response = await fetch(fullURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
        throw error;
      }
    };
  }
    export default getNftMetadata; 