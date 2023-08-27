import {
  type Block,
  decodeAbiParameters,
  parseAbiParameters,
  parseAbiParameter,
  type Hash,
  Hex,
} from "viem";

export type Listing = {
    chainId: BigInt,
    tokenId: BigInt,
    listingAddress: Hex,
    hasTokenId: boolean
}

export function listingDecoder(data: Hash): readonly [readonly Listing[]] {
  return decodeAbiParameters(
    parseAbiParameters(
      "(uint128 chainId, uint128 tokenId, address listingAddress, bool hasTokenId)[]"
    ),
    data
  );
}
