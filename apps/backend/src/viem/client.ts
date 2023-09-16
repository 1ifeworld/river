import { createPublicClient, http } from 'viem';
import { optimismGoerli } from 'viem/chains';

const transport = http(process.env.PONDER_RPC_URL_420);

export const publicClient = createPublicClient({
  chain: optimismGoerli,
  transport,
});
