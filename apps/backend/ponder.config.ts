import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    {
      name: "optimism-goerli",
      chainId: 420,
      rpcUrl: process.env.PONDER_RPC_URL_420,
    },
  ],
  contracts: [
    {
      name: "Router",
      network: "optimism-goerli",
      abi: "./abis/Router.json",
      address: "0x7539973c756c45bf0ecc4167d6ce9750c60f903d",
      startBlock: 13518679,
    },
  ],
};
