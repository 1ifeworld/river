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

  export async function pressDataDecoder(press: Hex) {
    const bytecode = await publicClient.getBytecode({
        address: press
    })
    console.log(bytecode)

  }