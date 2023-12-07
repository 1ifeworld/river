// Function to send a set request to the metadata server
export function sendMetadataRequest(cid: string) {
  const metadataServerUrl = process.env.METADATA_SERVER_URL; // URL of your metadata server

  if (!metadataServerUrl) return;

  fetch(`${metadataServerUrl}/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cid }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Metadata request successful:", data);
    })
    .catch((error) => {
      console.error("Metadata request failed:", error);
    });
  // Note: No 'await' used here. The request is sent, and the function completes immediately.
}
