"use server";

import { addresses } from "scrypt";
import { nonceManager } from "@/config/ethersClient";
import { Hash, encodeFunctionData } from "viem";
import { postGatewayABI } from "scrypt";

export async function relayPost({ postInput }: { postInput: Hash }) {
  const encodePostCall = encodeFunctionData({
    abi: postGatewayABI,
    functionName: "post",
    args: [postInput],
  });

  try {
    const postTxn = await nonceManager.sendTransaction({
      to: addresses.postGateway.opGoerli,
      data: encodePostCall,
    });
    const postTxnReceipt = await postTxn.wait();
    console.log("Post transaction receipt: ", postTxnReceipt);
  } catch (error) {
    console.error("Post transaction failed: ", error);
  }
}
