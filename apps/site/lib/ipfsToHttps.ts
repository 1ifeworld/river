export function ipfsToHttps(ipfsString: string) {
  if (!ipfsString) return ''
  return ipfsString.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
