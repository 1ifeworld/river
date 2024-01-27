import { defineChain } from 'viem'

export const river_dev_2_d5hb5orqim = defineChain({
  id: 3600855875265181,
  name: 'river_dev_2_d5hb5orqim',
  network: 'river_dev_2_d5hb5orqim',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-river-dev-2-d5hb5orqim.t.conduit.xyz'],
      webSocket: ['wss://rpc-river-dev-2-d5hb5orqim.t.conduit.xyz'],
    },
    public: {
      http: ['https://rpc-river-dev-2-d5hb5orqim.t.conduit.xyz'],
      webSocket: ['wss://rpc-river-dev-2-d5hb5orqim.t.conduit.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorerl2new-river-dev-2-d5hb5orqim.t.conduit.xyz',
    },
  },
  contracts: {
    multicall3: {
      address: '0x73465577E9FD7Cd585E4270F23A9eBa99B92b6eD',
      blockCreated: 5882,
    },
  },
})

export const river_j5bpjduqfv = defineChain({
  id: 36912,
  name: 'river_j5bpjduqfv',
  network: 'river_j5bpjduqfv',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://l2-river-j5bpjduqfv.t.conduit.xyz'],
      webSocket: ['wss://l2-river-j5bpjduqfv.t.conduit.xyz'],
    },
    public: {
      http: ['https://l2-river-j5bpjduqfv.t.conduit.xyz'],
      webSocket: ['wss://l2-river-j5bpjduqfv.t.conduit.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorerl2new-river-j5bpjduqfv.t.conduit.xyz/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 5882,
    },
  },
})
