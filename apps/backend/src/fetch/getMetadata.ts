import { BigNumberish } from "alchemy-sdk";
import { fetch } from "cross-fetch";

type Props = {
  network: BigInt;
  address: string;
  tokenId: BigNumberish;
};

const getMetadata = async ({ network, address, tokenId }: Props) => {
  // for multichain we will need to have agnostic baseURL
  if (network !== BigInt(1)) {
    throw new Error("Only mainnet is supported at the moment.");
  }
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}/getNFTMetadata?`;
  const fullURL = baseURL + `contractAddress=${address}&tokenId=${tokenId}`;

  if (network && address && tokenId) {
    try {
      const response = await fetch(fullURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching NFT metadata");
    }
  }
};
export default getMetadata;
