export interface IPFSData {
  name: string
  description: string
  image: string
}

export default async function fetchIPFSData(
  ipfsLink: string,
): Promise<IPFSData | undefined> {
  const httpLink = ipfsLink.replace('ipfs://', 'https:/dweb.link/ipfs/')
  try {
    const response = await fetch(httpLink)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const data = await response.json()
      if ('name' in data) {
        // console.log('DATA', data.name)
        return data
      }
    } else {
      console.log('Non-JSON response received')
    }

    return undefined
  } catch (error) {
    console.error('Error fetching IPFS data:', error)
    return undefined
  }
}
