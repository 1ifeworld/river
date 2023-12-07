// // Function to send a set request to the metadata server
// export async function sendMetadataRequest(cid: string) {
//   const metadataServerUrl = process.env.METADATA_SERVER_URL; // URL of your metadata server

//   if (!metadataServerUrl) return;

//   try {
//     const response = await fetch(`${metadataServerUrl}/set`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ cid }),
//     });
    
//     const data = await response.json();
//     console.log("Metadata request successful:", data);
//     return data; // Return the data
//   } catch (error) {
//     console.error("Metadata request failed:", error);
//     throw error; // You can rethrow the error or return a specific error response
//   }
// }



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
