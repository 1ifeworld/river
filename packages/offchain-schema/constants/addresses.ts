import {Hex} from "viem"

type AddressMap = {
  [chainName: string]: Hex;
};

type AddressBook = {
  [contractName: string]: AddressMap;
};

export const addresses: AddressBook = {
  idRegistry: {
      opGoerli: "0xD1afC5DBC6870b17e598273dB2cC6bbA9233b905",
  },
  delegateRegistry: {
      opGoerli: "0x513B15394BFd615fF4efFBFb4ee3DBFF641D63F8",
  },
  attestationRegistry: {
      opGoerli: "0x6d8313bBac1C0596Ff115DE28c8E0E4d3328DbE3",
  },
  nodeRegistry: {
      opGoerli: "0xbb78d4c915E5A5F65D8552991C92f4A0Bd104c8F",
      arbGoerli: "0x367c2E45d1bd72748ff482a552C1254fa39EC12c",
      arbNova: "0x45c05c7b7a5782BfB32553FecBCcCcBC36F21578",
      // ... add more chains as needed
  },
  riverValidatorV1: {
      opGoerli: "0x3E3522Ac4d89c56c8759F81a86ff94b8c39A45e3",
      // ... add more chains as needed
  },
  lightAccountFactory: {
      opGoerli: "0x00006B00f8Ee98Eb4eA288B1E89d00702361e055",
      // ... add more chains as needed
  },
  operator: {
      opGoerli: "0x004991c3bbcF3dd0596292C80351798965070D75",
      arbGoerli: "0x33F59bfD58c16dEfB93612De65A5123F982F58bA",
      arbNova: "0x33F59bfD58c16dEfB93612De65A5123F982F58bA",
      // ... add more chains as needed
  },
  entrypoint: {
      opGoerli: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      // ... add more chains as needed
  },
};

