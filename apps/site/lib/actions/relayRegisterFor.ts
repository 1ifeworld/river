"use server";

import { revalidatePath } from "next/cache";
import { Hash, Hex, decodeAbiParameters } from "viem";
import { addresses, idRegistryABI } from "scrypt";
import { publicClient } from "@/config/publicClient";
import { relayWalletClient, globalNonceManager } from "@/config/relayConfig";
import { writeContract, getTxnInclusion } from "@/lib";
import { setUsername } from "@/lib";

interface RelayRegisterForProps {
  registerForRecipient: Hex;
  recovery: Hex;
  expiration: bigint;
  signature: Hash;
  username: string;
  pathToRevalidate: string;
}

export async function relayRegisterFor({
  registerForRecipient,
  recovery,
  expiration,
  signature,
  username,
  pathToRevalidate,
}: RelayRegisterForProps) {
  try {
    // Attempt to send the transaction via writeContract
    const registerTxn = await writeContract(
      relayWalletClient,
      globalNonceManager,
      {
        chain: relayWalletClient.chain ?? null,
        // address: addresses.idRegistry.river_dev_2_d5hb5orqim,
        address: "0x339513226Afd92B309837Bad402c6D3ADDE9Ad24", // arb nova
        abi: idRegistryABI,
        functionName: "registerFor",
        args: [
          registerForRecipient, // to
          recovery, // recovery
          expiration, // expiration
          signature, // sig
        ],
      }
    );
    console.log("reigeter txn: ", registerTxn);
    // wait for txn receipt
    const txnReceipt = await publicClient.waitForTransactionReceipt({
      hash: registerTxn,
    });
    const [rid, recoveryAddress] = decodeAbiParameters(
      [
        { name: "rid", type: "uint256" },
        { name: "recoveryAddress", type: "address" },

      ],
      txnReceipt.logs[0].data
    );
    console.log("rid: ", rid)
    console.log("transaction receipt: ", txnReceipt);
    // console.log("topics", txnReceipt.logs[0].topics);
    // console.log("topics 1: ", txnReceipt)
    // console.log("topics 2: ", txnReceipt)
    // extract userId from logs
    // const userIdRegistered = parseInt(
    //   txnReceipt.logs[0].topics[2] as string,
    //   16
    // );
    //
    // console.log("userId registered", rid);
    // set username in username db
    await setUsername({
      userIdRegistered: String(rid),
      signature: signature,
      timestamp: expiration.toString(),
      username: username,
      registerForRecipient: registerForRecipient,
    });

    // userIdRegistered: string
    // username: string
    // registerForRecipient: Hex
    // signature: Hex
    // timestamp: string
    // to?: string

    // If writeContract + setUsername were successful, registerFor txn is valid and we proceed to check its inclusion
    const txnInclusion = await getTxnInclusion(registerTxn);
    // Check if the transaction is successfully included
    if (txnInclusion) {
      // If txnInclusion is true, the transaction was found and processed
      console.log(`Transaction ${registerTxn} was processed by ponder`);
      // Revalidate path. This is typically for cache invalidation.
      revalidatePath(pathToRevalidate);
      return true; // Return true to indicate successful processing
    } else {
      // If txnInclusion is false, the transaction was not found or not processed
      console.log(`Transaction ${registerTxn} NOT found by ponder`);
      return false; // Return false to indicate the transaction was not processed
    }
  } catch (error) {
    // Catch and log any errors that occur during the txn processing or username setting
    console.error("Error in user registration: ", error);
    return false; // Return false to indicate failure due to an error
  }
}
