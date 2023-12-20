export async function getChannelMetadata(uri: string) {

    const getMetadataEndpoint = `${process.env.NEXT_PUBLIC_METADATA_SERVER_URL}/get`
    const body = JSON.stringify({ cids: [uri] })
  
    try {
      const response = await fetch(getMetadataEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const metadata = await response.json()
      return {
        metadata: metadata,
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      return { metadata: null, error }
    }
  }
  