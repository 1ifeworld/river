const Hash = require('ipfs-only-hash')

const cidVersion = 1

export async function createIpfsHashFromAnything(input: string) {
  const hash = await Hash.of(input, {cidVersion})
  console.log(hash)
  return hash
}