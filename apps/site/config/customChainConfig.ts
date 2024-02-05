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
      http: [process.env.NEXT_PUBLIC_NOVA_RPC_URL as string],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_NOVA_RPC_URL as string],
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
