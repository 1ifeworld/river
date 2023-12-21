import { Hex } from 'viem'

type AddressMap = {
  [chainName: string]: Hex
}

type AddressBook = {
  [contractName: string]: AddressMap
}

export const addresses: AddressBook = {
  idRegistry: {
    opGoerli: '0xD1afC5DBC6870b17e598273dB2cC6bbA9233b905',
    river_j5bpjduqfv: '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24',
  },
  // delegateRegistry: {
  //   opGoerli: '0x513B15394BFd615fF4efFBFb4ee3DBFF641D63F8',
  // },
  // attestationRegistry: {
  //   opGoerli: '0x6d8313bBac1C0596Ff115DE28c8E0E4d3328DbE3',
  // },
  postGateway: {
    opGoerli: '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24',
    river_j5bpjduqfv: '0x1B692589017d4b2276227b52cD3A2a1796cb2b86',
    //   arbGoerli: "0x",
    //   anvil: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    // ... add more chains as needed
  },
  riverValidatorV1: {
    opGoerli: '0x3E3522Ac4d89c56c8759F81a86ff94b8c39A45e3',
    // ... add more chains as needed
  },
}
