export const getFromDb = async (cids: string[]) => {
  try {
    const metadataServerUrl = process.env.NEXT_PUBLIC_METADATA_SERVER_URL

    if (!metadataServerUrl) {
      console.error('Metadata server URL is not defined')
      return
    }

    const response = await fetch(`${metadataServerUrl}/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cids }),
    })

    const responseData = await response.json()
    console.log('RESPONSE CONTENT TYPE', responseData.content_type)
    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to fetch data from DB')
    }

    console.log('Response data from getFromDb:', responseData) // Logging the response

    return responseData
  } catch (error) {
    console.error('Error fetching data from DB:', error)
    return null
  }
}
