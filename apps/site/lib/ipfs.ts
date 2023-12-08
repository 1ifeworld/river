export function pinataUrlFromCid({ cid }: { cid: string }) {
  return `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY}`
}

export function ipfsUrlToCid({ ipfsUrl }: { ipfsUrl: string }) {
  if (!ipfsUrl) return ''
  return ipfsUrl.replace('ipfs://', '')
}

export function ipfsToHttps(ipfsString: string) {
  if (!ipfsString) return ''
  return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
