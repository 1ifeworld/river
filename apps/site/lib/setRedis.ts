export const isVideo = (mimeType: string) => {
  return ['video/mp4', 'video/webm', 'video/ogg'].includes(mimeType)
}

export const sendToDb = async (file: File, pubUri: string, uploadedImageUrl: string, uploadedAnimationUrl: string | null) => {
  try {
    const contentType = file.type;
    const metadataServerUrl = process.env.NEXT_PUBLIC_METADATA_SERVER_URL;

    if (!metadataServerUrl) {
      console.error("Metadata server URL is not defined");
      return;
    }

    // Create a data object that includes all fields, including animation_url and content_type
    const dataToSend = {
      cid: pubUri,
      name: file.name || 'unnamed',
      description: 'Your description here',
      image: uploadedImageUrl, 
      animation_url: uploadedAnimationUrl, // Include animation_url
      content_type: contentType, // Include content_type
    };

    console.log("Data being sent:", dataToSend);

    const response = await fetch(`${metadataServerUrl}/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    const responseData = await response.json();

    // Check if responseData is a string and parse it if necessary
    let parsedResponse = responseData;
    if (typeof responseData === 'string') {
      try {
        parsedResponse = JSON.parse(responseData);
      } catch (e) {
        console.error('Error parsing response data:', e);
      }
    }

    if (!response.ok) {
      throw new Error(parsedResponse.error || 'Failed to send data to DB');
    }
  } catch (error) {
    console.error('Error sending data to DB:', error);
  }
};
