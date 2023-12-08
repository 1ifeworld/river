import { Router, Request, Response } from "express";
import { redisClient } from "../redisClient";

export const setRouter = Router();

setRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;

    // Check if key and value are present
    if (!key || !value) {
      console.error("Received invalid data:", req.body);
      res
        .status(400)
        .json({ error: "Missing key or value in the request body" });
      return;
    }

    // Set the data in Redis
    await redisClient.set(key, value);

    // Respond with a success message or any additional processing if needed
    res.status(200).json({ message: "Data set successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Invalid data format" });
  }
});

// KEEP OLD IMPLEMENTATION HERE
// This is how to do processing from the ipfs file itself, as opposed
// to knowing all the information beforehand

// import { fetchIpfsData, isCid } from "../lib";
// import { CidData } from "../types";
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
