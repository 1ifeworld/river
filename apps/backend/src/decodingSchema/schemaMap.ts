import { listingDecoder } from "./decoders"
import { type Listing } from "./decoders";
import { type Hash } from 'viem'

export const schemaMap: { [key: string]: (data: Hash) => readonly [readonly Listing[]] } = {
    "2": listingDecoder
};

// export const schemaMap = {
//     "2": listingDecoder
// }