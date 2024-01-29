export function w3sUrlFromCid({ cid }: { cid: string }) {
  return `https://ipfs.w3s.link/ipfs/${cid}`
}

export function ipfsUrlToCid({ ipfsUrl }: { ipfsUrl: string }) {
  if (!ipfsUrl) return ''
  return ipfsUrl.replace('ipfs://', '')
}

export function ipfsToHttps(ipfsString: string) {
  if (!ipfsString) return ''
  return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
