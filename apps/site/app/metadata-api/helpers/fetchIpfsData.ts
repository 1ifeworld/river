export interface CidData {
  name: string
  description?: string
  image?: string
}

export async function fetchIpfsData(
  ipfsLink: string,
): Promise<CidData | undefined> {
  const cid = ipfsLink.replace('ipfs://', '')

  const httpLink = `https://${process.env.PINATA_GATEWAY}/ipfs/${cid}?pinataGatewayToken=${process.env.PINATA_GATEWAY_KEY}`

  try {
    const response = await fetch(httpLink)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (typeof data === 'object' && data !== null && 'name' in data) {
      return data
    } else {
      console.log(
        'Non-JSON response received or data does not contain "name" property',
      )
    }

    return undefined
  } catch (error) {
    console.error('Error fetching ipfs data:', error)
    return undefined
  }
}
