export interface MetadataObject {
  name: string
  description: string
  image: string
  animationUri: string
}

export interface MediaAssetObject {
  key: string
  value: {
    name: string
    description: string
    image: string
    animationUri: string
    contentType: string
    muxAssetId?: string
    muxPlaybackId?: string
    muxAssetStatus?: string
  }
}

export const sendToDb = async (data: MediaAssetObject) => {
  try {
    const metadataServerUrl = process.env.NEXT_PUBLIC_METADATA_SERVER_URL

    if (!metadataServerUrl) {
      console.error('Metadata server URL is not defined')
      return
    }

    console.log('Data being sent:', JSON.stringify(data))

    const response = await fetch(`${metadataServerUrl}/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    // Check if responseData is a string and parse it if necessary
    let parsedResponse = responseData
    if (typeof responseData === 'string') {
      try {
        parsedResponse = JSON.parse(responseData)
      } catch (e) {
        console.error('Error parsing response data:', e)
      }
    }

    if (!response.ok) {
      throw new Error(parsedResponse.error || 'Failed to send data to DB')
    }
  } catch (error) {
    console.error('Error sending data to DB:', error)
  }
}
