export interface IPFSData {
    name: string
    description: string
    image: string
  }
  
  export async function fetchIpfsData(
    ipfsLink: string,
  ): Promise<IPFSData | undefined> {
    const httpLink = ipfsLink.replace('ipfs://', 'https:/dweb.link/ipfs/')
    const timeout = 5000; // 5 seconds

    try {
      const timeoutSignal = new AbortController();
      const timeoutId = setTimeout(() => timeoutSignal.abort(), timeout);

      const response = await fetch(httpLink, { signal: timeoutSignal.signal })

      clearTimeout(timeoutId); // Clear the timeout if fetch is successful
  
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
  