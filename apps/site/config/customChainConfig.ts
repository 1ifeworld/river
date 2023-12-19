import { defineChain } from 'viem'

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
