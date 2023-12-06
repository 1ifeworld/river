export function isCid(cidString: string): boolean {
    // A simplified regular expression pattern
    // This will check for a string starting with 'b' or 'Qm' and followed by a series of alphanumeric characters.
    // It's less strict about the exact length or character set.
    const cidPattern = /^(b|Qm)[0-9A-Za-z]+$/;
  
    // Test if the input string matches the pattern
    return cidPattern.test(cidString);
  }

// This code was taken from the `is-ipfs` repo found at the following url:
// https://github.com/ipfs-shipyard/is-ipfs

// import * as multiformats from "multiformats";

// function isString(input: any): input is string {
//   return typeof input === "string";
// }

// export function isCid(hash: multiformats.CID | Uint8Array | string): hash is multiformats.CID {
//   try {
//     if (isString(hash)) {
//       return Boolean(multiformats.CID.parse(hash));
//     }

//     if (hash instanceof Uint8Array) {
//       return Boolean(multiformats.CID.decode(hash));
//     }

//     return Boolean(multiformats.CID.asCID(hash)); // eslint-disable-line no-new
//   } catch {
//     return false;
//   }
// }
