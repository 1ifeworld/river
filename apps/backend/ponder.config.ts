import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    {
      name: "optimism-goerli",
      chainId: 420,
      rpcUrl: process.env.ANVIL_FORK_URL,
    },
  ],
  contracts: [
    {
      name: "Router",
      network: "optimism-goerli",
      abi: "./abis/Router.json",
      address: "0x880253BF121374121fE21948DE3A426a695924ee",
      startBlock: 13777523,
    },
    {
      name: "LogicTransmitterMerkleAdmin",
      network: "optimism-goerli",
      abi: "./abis/LogicTransmitterMerkleAdmin.json",
      address: "0x4a38667adcd14d47ab927140e83aafa64b281e4c",
      startBlock: 13777523,
    },
  ],
};
