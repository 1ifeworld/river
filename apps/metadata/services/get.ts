import { Router } from "express";
import { redisClient } from "redisClient";

export const getRouter = Router();

getRouter.post("/", async (req, res) => {
  if (req.body == null || !req.body.cid) {
    res
      .status(400)
      .json({ error: "Request body is missing or CID is not provided" });
    return;
  }

  try {
    const nameForCid = await redisClient.get(req.body.cid);
    console.log("name found for cid!");
    console.log("name for cid: ", nameForCid);
    res
      .status(200)
      .json({
        message: "Post request processed successfully",
        name: nameForCid,
      });
  } catch (error) {
    console.log("error occured when fetching name for cid");
    console.log(error);
    res.status(500).json({ error: "Error fetching name for CID" });
  }
});
