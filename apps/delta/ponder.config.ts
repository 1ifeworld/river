import type { Config } from "@ponder/core";
import { http } from "viem";

export const config: Config = {
  networks: [
    {
      name: "optimism-goerli",
      chainId: 420,
      transport: http(process.env.PONDER_RPC_URL_420),
    },
  ],
  contracts: [
    {
      name: "IdRegistry",
      network: "optimism-goerli",
      abi: "./abis/IdRegistry.json",
      address: "0x7aC4E43F6A208DE2c3687c697Fd9AAD985CFDf6e",
      startBlock: 16455538,
    },
    {
      name: "DelegateRegistry",
      network: "optimism-goerli",
      abi: "./abis/DelegateRegistry.json",
      address: "0x7817aeef54E712a6b2D7a323A12310d9082DCF8E",
      startBlock: 16455538,
    },
    {
      name: "NodeRegistry",
      network: "optimism-goerli",
      abi: "./abis/NodeRegistry.json",
      address: "0x9637E115445A1fbB4E73A0934aB5BF799b74a65A",
      startBlock: 16455538,
    },
    {
      name: "RiverValidatorV1",
      network: "optimism-goerli",
      abi: "./abis/RiverValidatorV1.json",
      address: "0x1a8DCa9a6C01ed684400eF119E6b62bd41Cdf29C",
      startBlock: 16455538,
    },
  ],
};
