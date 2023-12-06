import { Router, Request, Response } from "express";
import { redisClient } from "redisClient";
import { CidData } from "types";

export const getRouter = Router();

// NOTE: expects cids to be prepended with leading `ipfs://`

getRouter.post("/", async (req: Request, res: Response) => {
  if (req.body == null || !req.body.cid) {
    res
      .status(400)
      .json({ error: "Request body is missing or CID is not provided" });
    return;
  }

  try {
    const dataForCid = await redisClient.get(req.body.cid);

    if (dataForCid) {
      console.log("GET worked correctly")
      res.status(200).json({
        message: "Post request processed successfully",
        data: dataForCid,
      });
    } else {
      res.status(404).json({ error: "Data for CID not found" });
    }
  } catch (error) {
    console.error("Error occurred when fetching data for CID", error);
    res.status(500).json({ error: "Error fetching data for CID" });
  }
});
