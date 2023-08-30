import {
    type Block,
    decodeAbiParameters,
    parseAbiParameters,
    parseAbiParameter,
    type Hash,
    Hex,
  } from "viem";

import { publicClient } from "../../viem/client";

  export type PressData = {};

  export function stringDecoder(data: Hash): readonly [String] {
    return decodeAbiParameters(
      parseAbiParameters(
        "string"
      ),
      data
    );
  }
  
  export async function pressDataDecoder(press: `0x${string}`) {
    if (!press) {
      return undefined;
    }
  
    const bytecode: any = await publicClient.getBytecode({
      address: press,
    });
  
    if (!bytecode) {
      return undefined;
    }
  
    const stringData = bytecode.slice(64);
    const decodedString = Buffer.from(stringData, 'hex').toString('utf8').replace(/\0/g, '');
  
    if (!decodedString) {
      return undefined;
    }
  
    const cleanedContractUri = decodedString.replace(/\u0011/g,'').trim();
    return cleanedContractUri;
}