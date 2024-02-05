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
      http: [
        'https://g.w.lavanet.xyz:443/gateway/arbn/rpc-http/86cbe35dfe0686d90306955304fb64d1',
      ],
      webSocket: [
        'wss://g.w.lavanet.xyz:443/gateway/arbn/rpc/86cbe35dfe0686d90306955304fb64d1',
      ],
    },
    public: {
      http: [
        'https://g.w.lavanet.xyz:443/gateway/arbn/rpc-http/86cbe35dfe0686d90306955304fb64d1',
      ],
      webSocket: [
        'wss://g.w.lavanet.xyz:443/gateway/arbn/rpc/86cbe35dfe0686d90306955304fb64d1',
      ],
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
