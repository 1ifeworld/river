import { Router, Request, Response } from "express";
import { redisClient } from "../redisClient";
import { fetchIpfsData, isCid } from "../lib";
import { CidData } from "../types";

export const setRouter = Router();

setRouter.post("/", async (req: Request, res: Response) => {
  const fullCid = req.body.cid;

  if (!fullCid || typeof fullCid !== "string") {
    res.status(400).json({ error: "CID is not provided or is not a string" });
    return;
  }

  // Extract the CID part from the full CID string
  const cid = fullCid.slice(7).trim();

  console.log("cid:", cid);

  if (!isCid(cid)) {
    console.error(`Invalid CID format: ${cid}`);
    // Store a null value for the invalid CID
    await redisClient.set(fullCid, null);
    res.status(400).json({ error: "Invalid CID format, stored as null" });
    return;
  }

  const cidFetchResponse = await fetchIpfsData(fullCid);

  if (cidFetchResponse && isValidCidData(cidFetchResponse)) {
    // Append data from the client to the server-side flow
    const combinedData = {
      ...cidFetchResponse, // Use data from server-side flow
      animation_url: req.body.animation_url, // Append animation_url from client
      content_type: req.body.content_type, // Append content_type from client
    };

    try {
      await redisClient.set(fullCid, JSON.stringify(combinedData));
      console.log("SET worked correctly for cid: ", cid);
      res.status(200).json({ message: "Request processed successfully" });
    } catch (error) {
      console.error("Redis set failed", error);
      console.log("SET failed (500) for cid: ", cid);
      res.status(500).json({ error: "Error setting data for CID: " });
    }
  } else {
    console.log("SET failed (400) for cid: ", cid);
    res.status(400).json({ error: "Invalid CID data or fetch unsuccessful" });
  }
  function isValidCidData(data: any): data is CidData {
  return (
    typeof data === "object" && "name" in data && typeof data.name === "string"
  );
}
})

// setRouter.post("/", async (req: Request, res: Response) => {
//   const fullCid = req.body.cid;

//   if (!fullCid || typeof fullCid !== "string") {
//     res.status(400).json({ error: "CID is not provided or is not a string" });
//     return;
//   }

//   // Extract the CID part from the full CID string
//   // const cid = fullCid.replace(/^ipfs:\/\//, "");
//   const cid = fullCid.slice(7).trim()

//   console.log("cid:", cid)

//   if (!isCid(cid)) {
//     console.error(`Invalid CID format: ${cid}`);
//     // Store a null value for the invalid CID
//     await redisClient.set(fullCid, null);
//     res.status(400).json({ error: "Invalid CID format, stored as null" });
//     return;
//   }

//   const cidFetchResponse = await fetchIpfsData(fullCid);
  
//   if (cidFetchResponse && isValidCidData(cidFetchResponse)) {
//     try {
//       await redisClient.set(fullCid, JSON.stringify(cidFetchResponse));
//       console.log("SET worked correctly for cid: ", fullCid);
//       res.status(200).json({ message: "Request processed successfully" });
//     } catch (error) {
//       console.error("Redis set failed", error);
//       console.log("SET failed (500) for cid: ", fullCid);
//       res.status(500).json({ error: "Error setting data for CID: " });
//     }
//   } else {
//     console.log("SET failed (400) for cid: ", fullCid);
//     res.status(400).json({ error: "Invalid CID data or fetch unsuccessful" });
//   }
// });

// function isValidCidData(data: any): data is CidData {
//   return (
//     typeof data === "object" && "name" in data && typeof data.name === "string"
//   );
// }
