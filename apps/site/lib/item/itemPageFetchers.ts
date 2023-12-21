import { Reference } from "@/gql";

export async function getReferenceMetadata(reference: Reference) {
    // Extract URI from the reference
    const uri = reference.pubRef?.uri;
    if (!uri) {
      return { metadata: null, error: "No URI found in reference" };
    }
    // setup endpoint
    const getMetadataEndpoint = `${process.env.NEXT_PUBLIC_METADATA_SERVER_URL}/get`;
    // Prepare the request body
    const body = JSON.stringify({ cids: [uri] });
  
    try {
      const response = await fetch(getMetadataEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const metadata = await response.json();
      return {
        metadata: metadata,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { metadata: null, error };
    }
  }
  
  export async function getReferencesMetadata(references: any) {
    // Extract URIs from the channels array
    const uris = references
      .map((reference: { pubRef: any }) => reference.pubRef.uri)
      .filter((uri: string | undefined) => uri != null);
    // setup endpoint
    const getMetadataEndpoint = `${process.env.NEXT_PUBLIC_METADATA_SERVER_URL}/get`;
    // Prepare the request body
    const body = JSON.stringify({ cids: uris });
  
    try {
      const response = await fetch(getMetadataEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const metadata = await response.json();
      return {
        metadata: metadata,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { metadata: null, error };
    }
  }

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
