'use server'

import { type Hex, type Hash, encodeAbiParameters, encodeFunctionData } from 'viem'
import {
  addresses,
  publicationSchema,
  encodeAccess101,
  encodePublication201,
  encodeChannel302,
  nodeRegistryABI,
} from 'scrypt'
import { nonceManager } from '@/config/ethersClient';
import { ethers } from "ethers";

interface CreatePublicationProps {
  userId: bigint
  adminIds: bigint[]
  memberIds: bigint[]
  pubUri: string
  nodeId: bigint
}

export async function createPubEthers({
  userId,
  adminIds,
  memberIds,
  pubUri,
  nodeId,
}: CreatePublicationProps) {
    
    // Initialize contract -- for use in both reigstetr + update calls
    const contract = new ethers.Contract(addresses.nodeRegistry.opGoerli, nodeRegistryABI, nonceManager);   
  
    // Prep register function inputs
    const accessControlMessage = encodeAccess101({ adminIds, memberIds })
    const publicationUriMessage = encodePublication201({ pubUri })
    const messageArray: Hash[] = [accessControlMessage?.message as Hash, publicationUriMessage?.message as Hash]

    // Encode register function data
    const registerEncodedData = contract.interface.encodeFunctionData("register", [userId, publicationSchema, messageArray])

    // Declare variable to house pub node if succesful
    let pubNodeIdCreated;

    // Process the register transaction
    try {
        const regTxn = await nonceManager.sendTransaction({
            to: addresses.nodeRegistry.opGoerli,
            data: registerEncodedData
        });
        const regTxnReceipt = await regTxn.wait();
        pubNodeIdCreated = parseInt(regTxnReceipt?.logs[0].topics[3] as string, 16)

        // console.log("regTxnReceipt: ", regTxnReceipt);
        console.log("pubNodeIdCreated: ", pubNodeIdCreated);
    } catch (error) {
        console.error("Register Transaction failed: ", error);
    }

    // call second txn if first was succssful
    if (pubNodeIdCreated) {
        // log that if check was successful
        console.log("attempting update call")
        // Prep update function inputs
        const addItemMessage = encodeChannel302({ 
            chainId: BigInt(420),
            id: BigInt(pubNodeIdCreated),
            pointer: addresses.nodeRegistry.opGoerli,
            hasId: true,        
        })
        const updateMessagesArray: Hash[] = [addItemMessage?.message as Hash]
        const targetChannel: bigint = BigInt(94)

        // Encode register function data
        const updateEncodedData = contract.interface.encodeFunctionData("update", [userId, targetChannel, updateMessagesArray])

        // Process the update transaction
        try {
            const updTxn = await nonceManager.sendTransaction({
                to: addresses.nodeRegistry.opGoerli,
                data: updateEncodedData
            });
            const updTxnReceipt = await updTxn.wait();
            pubNodeIdCreated = parseInt(updTxnReceipt?.logs[0].topics[3] as string, 16)

            console.log("updTxnReceipt: ", updTxnReceipt);
            // console.log("pubNodeIdCreated: ", pubNodeIdCreated);
        } catch (error) {
            console.error("Update Transaction failed: ", error);
        }
    }
}

createPubEthers({
    userId: BigInt(1),
    adminIds: [BigInt(1)],
    memberIds: [BigInt(2), BigInt(3)],
    pubUri: "exampleIpfsString",
    nodeId: BigInt(94)
})