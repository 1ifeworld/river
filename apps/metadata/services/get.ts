import { Router, Request, Response } from "express";
import { redisClient } from "../redisClient";
import { CidData } from "../types";

export const getRouter = Router();

// Route changed to GET
getRouter.get("/", async (req: Request, res: Response) => {
  // Retrieve cids from query parameters
  const cids = req.query.cids;

  // Check if 'cids' exists and is a string
  if (!cids || typeof cids !== 'string') {
    res.status(400).json({ error: "No CIDs provided or invalid format" });
    return;
  }

  // Split the cids string into an array
  const cidsArray = cids.split(',');

  try {
    // Fetch all values at once using MGET
    const dataValues = await redisClient.mget(...cidsArray);
    
    const results: Record<string, any> = {};
    cidsArray.forEach((cid, index) => {
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
