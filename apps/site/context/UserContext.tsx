import React, { createContext, useContext } from 'react'
import { Email } from '@privy-io/react-auth'
import { Hex } from 'viem'

interface IUserContext {
  email?: Email
  signer?: Hex | string
}

export const UserContext = createContext<IUserContext>({
  email: undefined,
  signer: undefined,
})

export const useUserContext = () => useContext(UserContext)
