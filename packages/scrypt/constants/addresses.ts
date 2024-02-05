import { Hex } from 'viem'

type AddressMap = {
  [chainName: string]: Hex
}

type AddressBook = {
  [contractName: string]: AddressMap
}

export const addresses: AddressBook = {
  idRegistry: {
    nova: '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24',
    optimism: '0x44192479891D358Ec917765dbF6472B916DC9A0C'
  },
  postGateway: {
    nova:'0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217',
    // nova:'0x423a602F5e551A25b28eb33eB56B961590aD5290',
  },
}
