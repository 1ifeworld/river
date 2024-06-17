import type { Hex } from 'viem'

type AddressMap = {
  [chainName: string]: Hex
}

type AddressBook = {
  [contractName: string]: AddressMap
}

export const addresses: AddressBook = {
  // idRegistry: {
  //   optimism: '0x44192479891D358Ec917765dbF6472B916DC9A0C',
  // },
  // optimism sepolia
  idRegistry: {
    optimism: '0xc5799be72019c0b79a176bb386644b8be3b58590',
  },
  postGateway: {
    nova: '0x423a602F5e551A25b28eb33eB56B961590aD5290',
  },
  riverRecovery: {
    optimism: '0xFB0F92f8abdFA25415ADbb6EC0cd9EC33953F29a',
  },
}