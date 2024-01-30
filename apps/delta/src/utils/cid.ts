import * as Block from 'multiformats/block'
import * as codec from '@ipld/dag-cbor'
import { sha256} from 'multiformats/hashes/sha2'

export async function createCidFromAnything(input: unknown) {
    const block = await Block.encode({ value: input, codec: codec, hasher: sha256})
    const cid = block.cid
    console.log("block: ", block)
    return cid
}