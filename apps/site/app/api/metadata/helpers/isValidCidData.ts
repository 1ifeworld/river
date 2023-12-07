import { type CidData } from './fetchIpfsData'

// biome-ignore lint:
export function isValidCidData(data: any): data is CidData {
  return (
    typeof data === 'object' && 'name' in data && typeof data.name === 'string'
  )
}
