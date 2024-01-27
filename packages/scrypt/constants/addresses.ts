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
    river_dev_2_d5hb5orqim: '0xd35fF289853947472b22773E323D6239C32e1E7A',
  },
  delegateRegistry: {
    river_dev_2_d5hb5orqim: '0x45c05c7b7a5782BfB32553FecBCcCcBC36F21578',
  },
  channelRegistry: {
    river_dev_2_d5hb5orqim: '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24',
  },  
  itemRegistry: {
    river_dev_2_d5hb5orqim: '0xEc341633d600Bdad8E704729AE95049DDfec6c6f',
  },    
  roleBasedAccess: {
    river_dev_2_d5hb5orqim: '0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217',
  },      
  stringRenderer: {
    river_dev_2_d5hb5orqim: '0xdc151805e5A93284e1E337Bf5B7c4060AB9BC5Be',
  }
  // attestationRegistry: {
  //   opGoerli: '0x6d8313bBac1C0596Ff115DE28c8E0E4d3328DbE3',
  // },
  // postGateway: {
  //   opGoerli: '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24',
  //   river_j5bpjduqfv: '0x1B692589017d4b2276227b52cD3A2a1796cb2b86',
    //   arbGoerli: "0x",
    //   anvil: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    // ... add more chains as needed
  // },
  // riverValidatorV1: {
  //   opGoerli: '0x3E3522Ac4d89c56c8759F81a86ff94b8c39A45e3',
  //   // ... add more chains as needed
  // },
}
