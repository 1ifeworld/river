import { useAlchemyContext } from '@/context'
import { registerAndDelegate } from '@/lib'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { useState, useEffect } from 'react'
import { Hex } from 'viem'
import { usePrivy, Email } from '@privy-io/react-auth'
import { UserContext } from 'context/UserContext'
import { Header } from './Header'
import { entryPoint } from 'offchain-schema'
import { UsernameDialog } from './UsernameDialog'


export function Register() {
  const { authenticated, user: privyUser } = usePrivy()
  const alchemyProvider = useAlchemyContext()
  const [user, setUser] = useState<{ email?: Email; signer?: Hex | string }>({})

  useEffect(() => {
    if (authenticated && privyUser) {
      setUser({ 
        email: privyUser.email, 
        signer: privyUser.wallet?.address 
      });
    }
  }, [authenticated, privyUser]);


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
      <UserContext.Provider value={{ email: user.email, signer: user.signer }}>
      <Header />

        <button
          type="button"
          onClick={handleClick}
          className="border-[1px] border-black hover:bg-black/10 p-2 rounded text-black transition-all w-full"
        >
          Register Account
          
        </button>
        </UserContext.Provider>
      </>
    )
  } else {
    return <></>
  }
}
