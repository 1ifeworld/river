import { defineChain } from 'viem'

export const arbitrumNova = defineChain({
  id: 42170,
  name: 'arbitrumNova',
  network: 'arbitrumNova',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
       http: ['https://g.w.lavanet.xyz:443/gateway/arbn/rpc-http/86cbe35dfe0686d90306955304fb64d1'],
       webSocket: ['wss://g.w.lavanet.xyz:443/gateway/arbn/rpc/86cbe35dfe0686d90306955304fb64d1'],
    },
    public: {
      http: ['https://g.w.lavanet.xyz:443/gateway/arbn/rpc-http/86cbe35dfe0686d90306955304fb64d1'],
      webSocket: ['wss://g.w.lavanet.xyz:443/gateway/arbn/rpc/86cbe35dfe0686d90306955304fb64d1'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://nova.arbiscan.io/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1746963,
    },
  },
})

// export const arbitrumNova = defineChain({
//   id: 42170,
//   name: 'arbitrumNova',
//   network: 'arbitrumNova',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     default: {
//        http: [`${process.env.RPC_URL}`],
//        webSocket: [`${process.env.RPC_URL_WSS}`],
// },
//     public: {
//       http: [`${process.env.RPC_URL}`],
//       webSocket: [`${process.env.RPC_URL_WSS}`],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Explorer',
//       url: 'https://nova.arbiscan.io/',
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 1746963,
//     },
//   },
// })

// export const river_j5bpjduqfv = defineChain({
//   id: 36912,
//   name: 'river_j5bpjduqfv',
//   network: 'river_j5bpjduqfv',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://l2-river-j5bpjduqfv.t.conduit.xyz'],
//       webSocket: ['wss://l2-river-j5bpjduqfv.t.conduit.xyz'],
//     },
//     public: {
//       http: ['https://l2-river-j5bpjduqfv.t.conduit.xyz'],
//       webSocket: ['wss://l2-river-j5bpjduqfv.t.conduit.xyz'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Explorer',
//       url: 'https://explorerl2new-river-j5bpjduqfv.t.conduit.xyz/',
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: '0xcA11bde05977b3631167028862bE2a173976CA11',
//       blockCreated: 5882,
//     },
//   },
// })
