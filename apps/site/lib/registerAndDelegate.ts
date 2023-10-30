import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { register, delegate } from '@/constants'
import { Hex } from 'viem'

interface SendTransactionProps {
  from: Hex
  provider: AlchemyProvider
}

export async function registerAndDelegate({
  from,
  provider,
}: SendTransactionProps) {
  const hash = await provider.sendTransactions([
    {
      from: from,
      to: register.target,
      data: register.calldata,
    },
    {
      from: from,
      to: delegate.target,
      data: delegate.calldata,
    },
  ])
  console.log('Register txn hash:', hash)
}
