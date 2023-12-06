import { Router } from "express";
import { redisClient } from "redisClient";
import { fetchIpfsData } from "lib";

export const setRouter = Router();

setRouter.post("/", async (req, res) => {
  if (req.body == null) {
    res.status(400).json({ error: "Request body is missing" });
    return;
  }

  setNameForCid({ cid: req.body.cid });

  console.log("Your request went through", req.body);

  // Send a successful response back to the client
  res.status(200).json({ message: "Request processed successfully" });
});

async function setNameForCid({ cid }: { cid: string }) {
  const cidFetchResponse = await fetchIpfsData(cid);

  if (cidFetchResponse) {
    try {
      await redisClient.set(cid, cidFetchResponse.name);
    } catch (error) {
      console.log("Redis set failed");
      console.log(error);      
      // Handle errors
    }
  } else {
    console.log("Cid fetch unsuccessful");
  }
}
