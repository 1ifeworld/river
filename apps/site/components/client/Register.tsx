import { useAlchemyContext } from '@/context'
import { registerAndDelegate } from '@/lib'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { Hex } from 'viem'
import { usePrivy } from '@privy-io/react-auth'
import { entryPoint } from '@/constants'

export function Register() {
  const { authenticated } = usePrivy()
  const alchemyProvider = useAlchemyContext()
  alchemyProvider?.withAlchemyGasManager({
    policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY as string,
    entryPoint: entryPoint,
  })

  const handleClick = async () => {
    try {
      const smartAccountAddress = (await alchemyProvider?.getAddress()) as Hex
      await registerAndDelegate({
        from: smartAccountAddress,
        provider: alchemyProvider as AlchemyProvider,
      })
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  if (authenticated) {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          className="border-[1px] border-black hover:bg-black/10 p-2 rounded text-black transition-all w-full"
        >
          Register Account
        </button>
      </>
    )
  } else {
    return <></>
  }
}
