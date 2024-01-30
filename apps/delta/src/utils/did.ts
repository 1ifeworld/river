import * as Block from "multiformats/block";
import * as dagCborCodec from "@ipld/dag-cbor";
import { sha256 } from "multiformats/hashes/sha2";
import { base58btc } from "multiformats/bases/base58";
import { bytesToHex } from "@noble/hashes/utils";
import { base32 } from "rfc4648";
import { sha256 as sha256Hash } from "@noble/hashes/sha256";
import base64url from "base64url";
import { RiverPublicKey } from "./models";

/**
 * Encode a data block into a multiformats Block via dag-cbor with a sha256
 * hasher for CID
 */
export const encodeBlock = async (value: unknown) => {
  return await Block.encode({ value, codec: dagCborCodec, hasher: sha256 });
};

/**
 * Encode a secp256k1 bytes key into a multibase encoded (base58btc / "z"
 * prefix) key
 *
 * Specifically:
 * * MULTIBASE(base58-btc, MULTICODEC(0xe7, raw-public-key-bytes))
 */
export const bytesKeyToMultibase = (key: Uint8Array) => {
  const prefixed = new Uint8Array([0xe7, 0x01, ...key]);
  const encoded = base58btc.encode(prefixed);
  return encoded;
};

/**
 * Encode a bytes public key as a formatted river public key
 */
export const bytesKeyToRiverKey = (
  id: string,
  key: Uint8Array
): RiverPublicKey => ({
  id,
  publicKey: bytesKeyToMultibase(key),
  type: "secp256k1-multibase-encoded",
});

/**
 * Parse a multibase encoded key back into bytes
 *
 * Throws if the key is not base58btc encoded or if the key is not a secp256k1
 */
export const multibaseKeyToBytes = (key: string) => {
  if (!key.startsWith("z")) throw new Error("unexpected multibase format");
  const decoded = base58btc.decode(key);
  if (decoded[0] !== 0xe7 || decoded[1] !== 0x01)
    throw new Error("unexpected public key type");
  const sliced = decoded.slice(2); // remove prefix
  return sliced;
};

/**
 * Convert a bytes key into a did:key
 */
export const encodeDidKey = (key: Uint8Array) => {
  return `did:key:${bytesKeyToMultibase(key)}`;
};

/**
 * Decoded a did:key back into bytes
 */
export const parseDidKey = (didKey: string) => {
  const [did, key, content] = didKey.split(":");
  if (did !== "did" && key !== "key") throw new Error("invalid did key format");
  return multibaseKeyToBytes(content);
};

/**
 * Generate a new DID
 *
 * did:riv:$pre$mid$post
 *
 * Designed to be sight-readable with 4 hex characters at the beginning and end,
 * and 10 bytes worth (16 characters) of base32 characters in the middle.
 *
 * The CID of the unsigned creation operation should be used as the seed bytes
 *
 * * pre = first 2 bytes of hashed seed, hex encoded
 * * mid = next 10 bytes of hashed seed, base32 encoded
 * * post = next 2 bytes of hashed seed, hex encoded
 */
export const createDID = (seed: Uint8Array) => {
  const hash = sha256Hash(seed);
  const pre = bytesToHex(hash.slice(0, 2));
  const mid = base32.stringify(hash.slice(2, 12)).toLowerCase();
  const post = bytesToHex(hash.slice(12, 14));
  return `did:riv:${pre}${mid}${post}`;
};

/** project a byte array into base64url */
export const bytesToBase64Url = (bytes: Uint8Array) =>
  base64url.encode(Buffer.from(bytes));

/** project base64url data into a byte array */
export const base64UrlToBytes = (str: string) =>
  new Uint8Array(base64url.toBuffer(str));

/* ADDING EXTRA CANT CONFIRM */

// export const encodeJSONToBytes = (
//   jsonObject: Record<string, any>
// ): Uint8Array => {
//   const jsonString = JSON.stringify(jsonObject);
//   return new TextEncoder().encode(jsonString);
// };

// NOTE: stupid hack to allow big ints
export const encodeJSONToBytes = (jsonObject: Record<string, any>): Uint8Array => {
    const jsonString = JSON.stringify(
      jsonObject,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );
    return new TextEncoder().encode(jsonString);
  };