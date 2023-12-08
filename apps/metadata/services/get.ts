import { Router, Request, Response } from "express";
import { redisClient } from "../redisClient";

export const getRouter = Router();

// NOTE: expects cids to be prepended with leading `ipfs://`
getRouter.post("/", async (req: Request, res: Response) => {
  const cids = req.body.cids;

  // Check if 'cids' is an array and it's not empty
  if (!Array.isArray(cids) || cids.length === 0) {
    res.status(400).json({ error: "No CIDs provided or invalid format" });
    return;
  }

  try {
    // Fetch all values at once using MGET
    const dataValues = await redisClient.mget(...cids);

    const results: Record<string, any> = {};
    cids.forEach((cid, index) => {
      results[cid] = dataValues[index];
    });

    res.status(200).json({
      message: "CIDs processed successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error occurred when fetching data for CIDs", error);
    res.status(500).json({ error: "Error fetching data for CIDs" });
  }
});
