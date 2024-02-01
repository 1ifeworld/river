import * as codec from '@ipld/dag-cbor'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'

export async function createBlockFromAnything(input: unknown) {
  return await Block.encode({
    value: input,
    codec: codec,
    hasher: sha256,
  })
}
