import * as codec from '@ipld/dag-cbor'
import * as Block from 'multiformats/block'
import { sha256 } from 'multiformats/hashes/sha2'
import { base64 } from "multiformats/bases/base64"
import base64url from 'base64url'

export async function createBlockFromAnything(input: unknown) {
  return await Block.encode({
    value: input,
    codec: codec,
    hasher: sha256,
  })
}

/** project a byte array into base64url */
export const bytesToBase64Url = (bytes: Uint8Array) => base64url.encode(Buffer.from(bytes));

/** project base64url data into a byte array */
export const base64UrlToBytes = (str: string) => new Uint8Array(base64url.toBuffer(str));

// export async function base64EncodeToBlock(input: any) {
//   input.toString()
// }

// export async function decodeCidToAnything(input: any) {
//   return await 
// }