import { Hex } from 'viem'

type AddressMap = {
  [chainName: string]: Hex
}

type AddressBook = {
  [contractName: string]: AddressMap
}

export const addresses: AddressBook = {
  idRegistry: {
    optimism: '0x44192479891D358Ec917765dbF6472B916DC9A0C',
  },
  postGateway: {
    nova:'0x423a602F5e551A25b28eb33eB56B961590aD5290'
  },
  riverRecovery: {
    optimism: '0xFB0F92f8abdFA25415ADbb6EC0cd9EC33953F29a',
  }
}
